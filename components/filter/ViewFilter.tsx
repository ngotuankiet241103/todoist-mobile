
import useChangeView from "../../hooks/useChangeView";
import { ProjectGroupKey } from "../../hooks/useTasks";
import useOpenModal from "../../hooks/useOpenModal";
import { priority } from "../form/FormPriority";
import { useSelector } from "react-redux";
import { state } from "../../redux/store";
import { LabelSlice } from "../../redux/reducer/labelSlice";
import { Filter } from "../../redux/reducer/stateSlice";
import { useEffect, useRef, useState } from "react";
import { TaskSliceKey } from "../../redux/reducer/tasksSlice";
import useTheme from "../../hooks/useTheme";
import { bgColor, bgMode,  hoverMode, sidebarMode, textColor } from "../../utils/theme";
import { Button, Dimensions, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get('window');
type ViewFilter = {
  isShow: boolean;
  label: string;
  setIsFilter: (value: boolean) => void;
  type: page;
  filter: {
    filter: Filter,
    setFilter: (value: Filter) => void;
  }
  group: {
    group: ProjectGroupKey;
    setGroup: (value: ProjectGroupKey) => void;
  };
  handleToggleFilter: () => void
};
type page = TaskSliceKey;
const groups: { [key in page]: ProjectGroupKey[] } = {
  project: ["default", "due date", "priority"],
  today: ["default", "due date", "priority"],
  upcoming: []
};
const ViewFilter = ({
  type,
  isShow,
  setIsFilter,
  filter,
  label,
  group: { group, setGroup },
  handleToggleFilter
}: ViewFilter) => {
  const { state, handleChangeView: handleClick } = useChangeView(label);
  const priorities = useSelector((state: state) => state.priority);
  const labels = useSelector((state: state) => state.label);
  const {theme} = useTheme();
  const arr = groups[`${type}`];
  const { isShow: openGroupOption, handleToggleModel } = useOpenModal(false);
  

  
  const Render = () => {
    return (
      <>
        {arr ? (
          <View style={{position: 'relative'}}>
            <TouchableOpacity style={{...styles.flex}} onPress={handleToggleModel}>
              <Text>Group:</Text>
              <Text>{group}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{position: 'absolute',top: '100%',left: 0,width: width,backgroundColor: '#fff',zIndex: 99,display:  openGroupOption ? "flex" : "none"}}
            >
              {Object.entries(arr).map(([key, value], index) => (
                <TouchableOpacity
                  onPress={() => setGroup(value)}
                  key={index}
                  style={{...styles.flex,paddingHorizontal: 8,paddingVertical:4,borderBottomWidth:1}}
                  
                >
                  <Text>{value}</Text>
                  {value === group && (
                    <Text style={{color: `${textColor[theme.color]}`}}>
                     <AntDesign name="check" size={18} color="black" />
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </TouchableOpacity>
            
          </View>
        ) : (
          ""
        )}
      </>
    );
  };
  
  return (
   <View  style={styles.filter}>
     <Pressable style={{}} onPress={(e) => e.stopPropagation()}>
     {/* <View style={{display: 'flex'}}>
      <TouchableOpacity style={{backgroundColor: `${sidebarMode[theme.mode]()}`,...styles.view,borderWidth: 1,width:120,marginVertical: 'auto'}} onPress={onClick}>
          <Text>View ++</Text>
        </TouchableOpacity>
     </View> */}
      <View style={{...styles.child,width: width,display: isShow ? "flex" : "none",shadowColor: '#fff'}}>
      <Text style={{fontWeight: 'bold',marginBottom: 4,display: isShow ? "flex" : "none"}} >View</Text>
      <TouchableOpacity style={{backgroundColor: '#DC4C3E',borderRadius: 10,height: 40,padding: 2,marginBottom: 4,display: "flex",flexDirection: "row",gap: 4}}>
        <TouchableOpacity
            style={{...styles.boxList,backgroundColor: state?.isList ? "rgb(255,239,229)" :"#fafafa",flex: 1}}
            onPress={handleClick}>
              <Text>List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.boxList,backgroundColor: !state?.isList ? "rgb(255,239,229)" :"#fafafa"}}
            onPress={handleClick}>
            <Text>Board</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <Render></Render>
        <View>
          <Text style={{paddingVertical: 4,fontWeight: 'bold',fontSize: 18}}>Filter by</Text>
          <RenderPriority isShow={isShow} setFilter={filter.setFilter} filter={filter.filter} onClick={setIsFilter} label="Priority" priorities={priorities}  />
          <RenderFilterLabel isShow={isShow} setFilter={filter.setFilter} filter={filter.filter} onClick={setIsFilter} label="Label" labels={labels}/>
        </View>
        <Button title="Save" onPress={() => {
          handleToggleFilter();
          
        }}/>
      </View>
     
    </Pressable>
    
   </View>
  );
};
const RenderPriority = ({label,priorities,onClick,filter,setFilter,isShow}: {isShow:boolean,setFilter:(value: Filter)=> void, filter: Filter,label:string, priorities: priority[],onClick: (value: boolean) => void}) => {
  const {isShow:showForm,handleToggleModel} = useOpenModal(false);
  const {theme} = useTheme();
  
  
  useEffect(() => {
    if(!isShow && showForm){
      handleToggleModel()
    }
  },[isShow])
  const handleClick = (priorityCode: string) => {
  
    onClick(true);
    const index = filter ? filter.priorityCode.findIndex(item => item === priorityCode) : -1;
    console.log(index);
    
    const newArr = [...filter.priorityCode];
    if(index >= 0){
      newArr.splice(index,1);
      console.log(newArr);
      
      setFilter({
        ...filter,
        priorityCode: newArr
      })
    }
    else{
    
      setFilter({
        ...filter,
        priorityCode: [...newArr,priorityCode]
      })
    }
    
    
  }
  return (
    <>
      <View style={{position: 'relative'}}>
        <TouchableOpacity style={{...styles.flex}} onPress={handleToggleModel}>
          <Text>{label}:</Text>
          <Text>{filter  && filter.priorityCode.length > 0 ? filter.priorityCode.map((item,index,arr) => index === arr.length -1 ? item : `${item},`).join('') : "All(Default)" }</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{display: showForm ? 'flex' : 'none'}}>
          {priorities.length > 0 &&  priorities.map(item => <TouchableOpacity onPress={() => handleClick(item.code)}  className={`flex px-4 py-2 rounded-lg justify-between ${hoverMode[theme.mode]()} transition-all ` } key={item.id}>
            <Text>{item.name}</Text>
            <Text style={{display: check(filter,item.code,"labelCode") ? "flex" : "none"}}><AntDesign name="check" size={18} color="black" /></Text>
          </TouchableOpacity>)}
        </TouchableOpacity>
      </View>
    </>
  );
}
const check = (filter: Filter,value: string,key: "labelCode" | "priorityCode") => {
  return filter ? filter[`${key}`] && filter[`${key}`].length > 0 && filter[`${key}`].some(item =>  item===value): false;
}
const RenderFilterLabel = ({label,labels,onClick,filter,setFilter,isShow}: {isShow:boolean,setFilter:(value: Filter)=> void,label:string, labels: LabelSlice,onClick: (value: boolean) => void,filter: Filter}) => {
  const {isShow:showForm,handleToggleModel} = useOpenModal(false);
  const [labelSearch,setLabelSearch] = useState<LabelSlice>(labels);
  const {theme} = useTheme();
  useEffect(() => {
    
    if(!isShow && showForm){
      handleToggleModel()
    }
    else{
      setLabelSearch(labels);
    }

  },[isShow])

  const handleClick = (labelCode: string) => {
    onClick(true);
    const index = filter ? filter.labelCode.findIndex(item => item === labelCode) : -1;
    const newArr = [...filter.labelCode];
    if(index >= 0){
      newArr.splice(index,1);
      setFilter({
        ...filter,
        labelCode: newArr
      })
    }
    else{
    
      setFilter({
        ...filter,
        labelCode: [...newArr,labelCode]
      })
    }
    
    
  }
  const handleSearchLabel = (value: string) => {
   
  
      if(value){
        const newArr = labels.filter(label => label.name.includes(value));
        setLabelSearch(newArr);
      }
      else{
        setLabelSearch(labels);
      }
    
  }
  return (
    <View style={{}}>
        <TouchableOpacity style={{...styles.flex}} onPress={handleToggleModel}>
          <Text >{label}:</Text>
          <Text>{filter && filter.labelCode && filter.labelCode.length > 0 ? filter.labelCode.map((item,index,arr) => index === arr.length -1 ? item : `${item},`).join('') : "All(Default)" }</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.child,display: showForm ? 'flex' : 'none'}} 
        >
          <View style={{...styles.boxInput}}>
            <TextInput onChangeText={(value) => handleSearchLabel(value)}  style={{...styles.input}} placeholder="Search your label"/>
          </View>
          {labelSearch.length > 0 &&  labelSearch.map(item => <TouchableOpacity  onPress={() => handleClick(item.code)} style={{...styles.flex,...styles.boxLabel}} key={item.id}>
            <Text>{item.name}</Text>
            <Text style={{display: check(filter,item.code,"labelCode") ? "flex" : "none"}}><AntDesign name="check" size={18} color="black" /></Text>
          </TouchableOpacity>)}
        </TouchableOpacity>
      </View>
  );

}
const styles = StyleSheet.create({
  filter: {
   
    backgroundColor: '#f0f0f0',
    // transition equivalent requires using Animated or similar libraries
  },
  base: {
      padding: 4,
      width: 'auto'
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  child: {
    position: 'static',  // equivalent to absolute
    zIndex: 99,  // equivalent to z-20
    padding: 8,  // equivalent to py-2
    top: 0,  // equivalent to top-10 (10 x 4px)
    left: 0,  // equivalent to left-0
    width: width, // Sử dụng chiều rộng của màn hình
    height: height, // Sử dụng chiều cao của màn hình
    right: 0,
    bottom: 0,
  
    // transition equivalent requires using Animated or similar libraries
  },
  hidden: {
    display: 'none'
  },
  boxInput: {
    marginBottom: 8,
    paddingVertical: 8
  },
  input: {
    borderWidth: 1, // equivalent to border
    borderColor: '#D1D5DB', // equivalent to border-gray-300
    backgroundColor: 'transparent', // equivalent to bg-transparent
    width: '100%', // equivalent to w-full
    paddingHorizontal: 8, // equivalent to px-2 (2 * 4px)
    paddingVertical: 4, // equivalent to py-1 (1 * 4px)
    borderRadius: 10, // equivalent to rounded-lg
    // outline-none, not directly needed in mobile
  },
  boxLabel: {
    paddingHorizontal: 16, // equivalent to px-4
    paddingVertical: 8, // equivalent to py-2
    borderRadius: 10, // equivalent to rounded-lg
    backgroundColor: '#f0f0f0', // just adding background color for better visualization
  },
  view: {
    borderRadius: 4, // equivalent to rounded-sm
    paddingHorizontal: 12, // equivalent to px-3 (3 * 4px)
    paddingVertical: 8, // equivalent to py-2 (2 * 4px)
  
  },
  boxList: {
    borderRadius: 10, // equivalent to rounded-lg
    flex: 1, // equivalent to flex-1
    justifyContent: 'center', // equivalent to justify-center
    alignItems: 'center', 
  }

})
export default ViewFilter;
