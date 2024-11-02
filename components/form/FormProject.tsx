import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { state } from '../../redux/store';
import { ProjectInfo } from '../../redux/reducer/projectSlice';
import requestApi from '../../helper/api';

import useOpenModal from '../../hooks/useOpenModal';
import { Tag } from './FormTask';
import BoxTitle from './BoxTitle';
import { showTag } from '../../utils/tag';
import useTheme from '../../hooks/useTheme';
import {  hoverMode, primary, sidebarMode, textColor } from '../../utils/theme';
import IconMenu from '../icon/IconMenu';
import { Keyboard, Pressable, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
export type SectionItem = {
    id: number,
    name: string,
    code: string
}
type Section = SectionItem[]

type formProject = {
    isInbox?: boolean
    tag?: Tag,
    onclick:(project?: ProjectInfo, 
    section?: SectionItem) => void,
}
const FormProject = ({isInbox = true,tag,onclick} : formProject ) => {
    const project = useSelector((state: state) => state.project)
    const {isShow,handleToggleModel} = useOpenModal(false);
    const {theme} = useTheme();
    const handleClick = (project?: ProjectInfo, 
        section?: SectionItem) => {
        
            
        onclick(project,section);
        handleToggleModel();
    }
    useEffect(() => {
        if(isInbox && project.inbox){
           onclick(project.inbox);
        }
    },[])
   
    return (
        <View style={{position: 'relative'}}>
          
            <Pressable style={{flexDirection: 'row',alignItems: 'center'}} onPress={() => {
              Keyboard.dismiss();
              handleToggleModel();
            }}>
                <AntDesign name="inbox" size={20} color={`${textColor[theme.color]}`} />
                <Text style={{paddingHorizontal: 12,paddingVertical: 4,borderRadius: 8,borderWidth: 1,borderColor: '#fafafa'}} > {tag && showTag(tag)}</Text>
            </Pressable>
            {isShow && 
                <View style={{
                    position: 'absolute',
                    zIndex: 10,
                    paddingHorizontal: 4,
                    top: 40,
                    left: 0,
                    backgroundColor: `${sidebarMode[theme.mode]()}`,
                    borderRadius: 12,
                    width: 300
                }} >
                    <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',paddingVertical: 4}}>
                        {project.inbox && <ProjectItem onClick={handleClick} project={project.inbox}></ProjectItem>}
                        {isInbox && <AntDesign name="check" size={20} color="black" />}
                    </View>
                    <View >
                        <Text style={{fontWeight: 'bold',paddingVertical: 4}}>My projects</Text>
                        {project.myProject.length > 0 && project.myProject.map(project => <ProjectItem onClick={handleClick} key={project.id} project={project} />)}
                    </View>
                </View>
            }
        </View>
    );
};

const ProjectItem = ({project,onClick} : {project: ProjectInfo,onClick:(project?: ProjectInfo, section?: SectionItem) => void}) => {
    const {theme} = useTheme();
    return (
        <View>
           <Text style={{cursor: 'pointer',paddingHorizontal: 2,paddingVertical: 8}}># {project.name}</Text>
           <View >
            <SectionList onClick={onClick} project={project}></SectionList>
           </View> 
        </View>
    );

}
const SectionList = ({project,onClick} : {project: ProjectInfo,onClick:(project?: ProjectInfo, section?: SectionItem) => void}) => {
    const [sections,setSection] = useState<Section>();
    
    useEffect(() => {
        const getSections = async () => {
            try {
                const response = await requestApi(`/sections/${project.code}`,"GET")
                if(response.status === 200){
                    setSection(response.data);
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        getSections()
    },[])
    return (
        <>
            {sections && sections.length > 0 && sections.map(section => <SectionItem key={section.id} onClick={() => onClick(project,section)} section={section} ></SectionItem>)}
        </>
    );
}
const SectionItem = ({section,onClick} : {section: SectionItem, onClick: () => void}) => {
    const {theme} = useTheme();
    return (
        <>
            <Pressable style={{paddingLeft: 20,paddingRight: 4,flexDirection: 'row',alignItems: 'center'}} onPress={onClick}>
                <IconMenu style={{fontSize: 18}} icon="square"></IconMenu>
                <Text style={{fontSize: 16}}> {section.name}</Text>
            </Pressable>
        </>
    );
}
export default FormProject;