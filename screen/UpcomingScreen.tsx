import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  findNodeHandle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useChangeView from "../hooks/useChangeView";
import { useSelector } from "react-redux";
import useTheme from "../hooks/useTheme";
import {
  formatDate,
  formatDayComing,
  formatMonthComing,
} from "../utils/formatDate";
import SubProjectItem from "../components/project/SubProjectItem";
import { textColor } from "../utils/theme";
import BaseApp from "../components/layout/BaseApp";
import { state } from "../redux/store";
import useTasks from "../hooks/useTasks";
import { AntDesign } from "@expo/vector-icons";
import DetaiTask from "../components/task/DetaiTask";
const {width, height } = Dimensions.get("window");
const UpcomingScreen = () => {
  const key = "upcoming";
  const { state, getGroup, getFilter, getState } = useChangeView(key);
  const detail = useSelector((state: state) => state.detail);
  const { task, titles, upcoming, setUpcoming } = useTasks(
    key,
    getGroup(),
    getFilter()
  );
  const { isShow: showModal, task: taskDetail } = detail;
  const [page, setNextPage] = useState(0);
  const [newTitles, setNewTitles] = useState(Array.from(new Set(titles)) || []);
  const [newTask, setNewTask] = useState(task);
  const [index, setIndex] = useState(0);
  const { theme } = useTheme();
  const box = useRef(null);
  const [boxStyle, setBoxStyle] = useState(styles.defaultBox);
  const itemRefs = useRef([]);
  const [items,setItems] = useState();
  const scrollPosition = useRef(0); // Store the previous scroll position
  useEffect(() => {
    setNewTask(undefined);
    setNewTitles([]);
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 18);
    setUpcoming({ from: "", to: formatDate(newDate) });
  }, [state.filter]);
  useEffect(() => {
    if (titles) {
      newTitles
        ? setNewTitles(Array.from(new Set([...newTitles, ...titles])))
        : setNewTitles(Array.from(new Set([...titles])));
    }
  }, [titles]);
  useEffect(() => {
    if (box.current) {
      if (!getState()) {
        const widthPercentage = newTitles ? (100 * newTitles.length) / 6 : 0;
        setBoxStyle({
          ...styles.defaultBox,
          width: `${widthPercentage}%`,
          
        });
      } else {
        setBoxStyle({
          ...styles.defaultBox,
          width: "100%",
          marginLeft: 0,
        });
      }
    }
  }, [newTitles, getState()]);

  useEffect(() => {
    newTask ? setNewTask({ ...newTask, ...task }) : setNewTask(task);
  }, [task]);
  const next = () => {
    if (box.current) {
      const element = box.current;
      setBoxStyle({...boxStyle,marginLeft: -480 * (page + 1) })
      
      setNextPage(page + 1);
      if (page > 0 && page + 1 > (newTitles ? newTitles.length / 6 : 0) / 2) {
        const newDate = new Date(upcoming.to);
        newDate.setDate(newDate.getDate() + 18);
        setUpcoming({ from: upcoming.to, to: formatDate(newDate) });
      }
    }
  };
  const previous = () => {
    if (box.current) {
      const element = box.current;
      setBoxStyle({...boxStyle,marginLeft: -width * (page - 1) })
      setNextPage(page - 1);
    }
  };
  const Render = () => {
   
    return (
      <>
        {!newTask && <Text>Loading...</Text>}
        {newTask &&
          Object.entries(newTask).map(([key, value], index) => (
            <View
              key={index}
              style={{ ...styles.box, width: !getState() ? 240 : "auto" }}
            >
              <SubProjectItem
                type="today"
                isSection={false}
                isList={getState()}
                start={itemRefs.current.length}
                code={key}
                itemRefs={itemRefs}
                key={index}
                index={index}
                title={newTitles && newTitles[index]}
                tasks={value}
              ></SubProjectItem>
            </View>
          ))}
      </>
    );
  };
  const RenderTitles = () => {
    const arr = newTitles
      ? [...newTitles].splice(index, newTitles.length - index)
      : [];

    return (
      <>
        <View>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            {arr.length > 0 &&
              arr.map((title, i) => (
                <Text
                key={i}
                  style={{
                    width: 80,
                    paddingVertical: 4,
                    paddingHorizontal: 2,
                    borderRadius: 4,
                    color: i === 0 ? `${textColor[theme.color]}` : "",
                  }}
                >
                  {formatDayComing(new Date(title))}
                </Text>
              ))}
          </View>
        </View>
      </>
    );
  };
  const onDragStart = () => {};
  //   const onDragEnd = (result : DropResult) => {
  //     if (!result.destination) {
  //       return;
  //     }
  //     if (newTask) {
  //       const key = result.source.droppableId;
  //       const desKey = result.destination.droppableId;
  //       const index: number = result.source.index;
  //       const desIndex: number = result.destination.index;
  //       const arr = Array.from(newTask[key]);
  //       if (key != desKey) {
  //         if (desKey != "over date") {
  //           const [newItem] = arr.splice(index, 1);
  //           arr.slice(index, 1);
  //           const newDateItem : TaskResponse = {
  //             ...newItem,
  //             expiredAt: new Date(desKey),
  //           }

  //           const newArr = [...newTask[desKey], newDateItem];

  //           const item = reorder(newArr, newArr.length - 1, desIndex);
  //           setNewTask({ ...newTask, [key]: arr, [desKey]: item });
  //           const data = {
  //             id: newItem.id,
  //             expiredAt: new Date(desKey),
  //           };
  //           handleUpdateTask("/tasks/expired-at", data,"expiredAt");
  //         }
  //       } else {
  //         const item = reorder(arr, index, desIndex);
  //         console.log(item);

  //         setNewTask({ ...newTask, [key]: item });
  //       }
  //     }
  //   };
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const scrollY = event.nativeEvent.contentOffset.y;
    const currentOffset = event.nativeEvent.contentOffset.y;

    if(itemRefs.current){
      if (currentOffset > scrollPosition.current) {
        for(let i = index; i <= itemRefs.current.length - 1;i++ ){
          itemRefs.current[i].measureLayout(box.current, (x, y, width, height) => {
            console.log("scroll: " + i);
           
            // Kiểm tra xem   phần tử có nằm trong vùng nhìn thấy (viewport) không
            if (
              scrollX >= x &&
              scrollX <= x + width &&
              scrollY >= y &&
              scrollY <= y + height
            ) {
              setIndex(i);
              console.log("INDEX" + index);
              
              if (i >= newTitles.length / 3) {
                const newDate = new Date(upcoming.to);
                newDate.setDate(newDate.getDate() + 7);
                setUpcoming({ from: upcoming.to, to: formatDate(newDate) });
              }
              return;
            }
          });
        }
      } else if (currentOffset < scrollPosition.current) {
        for(let i = index; i >= 0;i-- ){
          itemRefs.current[i].measureLayout(box.current, (x, y, width, height) => {
            console.log("scroll");
            // Kiểm tra xem   phần tử có nằm trong vùng nhìn thấy (viewport) không
            if (
              scrollX >= x &&
              scrollX <= x + width &&
              scrollY >= y &&
              scrollY <= y + height
            ) {
              setIndex(i);
              console.log("INDEX" + index);
              
              if (i >= newTitles.length / 3) {
                const newDate = new Date(upcoming.to);
                newDate.setDate(newDate.getDate() + 7);
                setUpcoming({ from: upcoming.to, to: formatDate(newDate) });
              }
              return;
            }
          });
        }
      }
    }
    // Update scroll position for the next event
    scrollPosition.current = currentOffset;
    // console.log("scrollX" + scrollX);
    // console.log("scrollY" + scrollY);
    // let data = items
   
    //   data =  itemRefs.current.reduce((prev,ref,index) => {
    //     let corX,corY,wth,hgt,pX,pY;
    //     ref.measure( (x, y, width, height,px,py) => {
    //      corX = x;
    //       corY = y;
    //       wth = width;
    //       hgt = height,
    //       pX=px;  
    //       pY=py
    //       console.log('X position:', px); // Tọa độ x (tương tự offsetLeft)
    //     console.log('Y position:', py); // Tọa độ y (tương tự offsetTop)
    //     })
    //     return {
    //       [`${pX}-${pY}`]: index
    //     }
    //   })
    //   setItems(data);
    //   if(data &&  data[`${scrollX}-${scrollY}`]){
    //     const index = data[`${scrollX}-${scrollY}`]
    //     setIndex(index);
    //             console.log("INDEX" + index);
                
    //             if (index >= newTitles.length / 3) {
    //               const newDate = new Date(upcoming.to);
    //               newDate.setDate(newDate.getDate() + 7);
    //               setUpcoming({ from: upcoming.to, to: formatDate(newDate) });
    //             }
    //   }
    // if(box.current){
    //   box.current.measure((fx, fy, width, height, px, py) => {
    //     console.log('X position:', px); // Tọa độ x (tương tự offsetLeft)
    //     console.log('Y position:', py); // Tọa độ y (tương tự offsetTop)
    //   });
    // }
    // Duyệt qua các phần tử con và so sánh tọa độ của chúng
    // itemRefs.current.forEach((ref, index) => {
    //   if (ref) {
    //     ref.measureLayout(box.current, (x, y, width, height) => {
    //       console.log("scroll");
    //       // Kiểm tra xem   phần tử có nằm trong vùng nhìn thấy (viewport) không
    //       if (
    //         scrollX >= x &&
    //         scrollX <= x + width &&
    //         scrollY >= y &&
    //         scrollY <= y + height
    //       ) {
    //         setIndex(index);
    //         console.log("INDEX" + index);
            
    //         if (index >= newTitles.length / 3) {
    //           const newDate = new Date(upcoming.to);
    //           newDate.setDate(newDate.getDate() + 7);
    //           setUpcoming({ from: upcoming.to, to: formatDate(newDate) });
    //         }
    //         return;
    //       }
    //     });
    //   }
    // });
  };
  return (
    <>
      {taskDetail ? (
        <DetaiTask task={taskDetail} />
      ) : (
        <BaseApp page="upcoming" label={key}>
          <View>
            <View
              style={{ height: height, width: "auto" }}
              // className={` h-[100vh] ${
              //   !getState() ? "w-[1200px] overflow-x-hidden" : "w-[800px]"
              // }  mx-auto py-4 px-4`}
            >
              <Text
                style={{ fontSize: 29, fontWeight: "bold", marginBottom: 4 }}
              >
                upcoming
              </Text>
              <Text>{`${
                newTitles &&
                `${formatMonthComing(new Date(newTitles[index + 1]))}`
              }`}</Text>
              {!getState() ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: 4,
                    paddingBottom: 4,
                    borderBottomWidth: 1,
                    borderBottomColor: "#d1d5db",
                  }}
                >
                  <Pressable
                    onPress={page > 0 ? () => previous() : undefined}
                    style={{
                      paddingHorizontal: 4,
                      borderRadius: 4,
                    }}
                    //   className={`px-2  rounded-sm ${
                    //     page > 0
                    //       ? "cursor-pointer bg-gray-100"
                    //       : "cursor-not-allowed bg-gray-50"
                    //   }`}
                  >
                    <AntDesign name="left" size={22} color="black" />
                  </Pressable>
                  <Pressable
                    style={{
                      paddingHorizontal: 4,
                      borderRadius: 4,
                    }}
                    onPress={next}
                  >
                    <AntDesign name="right" size={22} color="black" />
                  </Pressable>
                </View>
              ) : (
                <RenderTitles/>
              )}

              {/* <DragDropContext
              // isDragging={(event) => console.log(event)}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            > */}
              <ScrollView
                style={{
                  
                  display: 'flex',
                  height: getState() ? 'auto' : "auto",
                  flexDirection: getState() ? "column" : "row",
                  gap: 2,
                  paddingHorizontal: !getState() ? 16 : 4,
                 
                  
                }}
                ref={box}
                onScroll={handleScroll}
                nestedScrollEnabled
                scrollEventThrottle={16}
                
              >
                 <View
                style={{
                  ...boxStyle,
                  display: "flex",
                  flexDirection: getState() ? "column" : "row",
                  height: "auto",
                  gap: 4,
                  marginTop: 12,
                  
                }}
              >
                <Render />
              </View>
              </ScrollView>
              {/* </DragDropContext> */}
            </View>
          </View>
        </BaseApp>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  taskList: {
    flexDirection: "row",
  },
  taskItem: {
    minWidth: 260,
    maxWidth: 260,
    marginRight: 16, // Apply margin to create spacing
  },
  box: {
    marginBottom: 20,
  },
  "box-task": {
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
          width: 0,
          height: 54,
        },
        shadowOpacity: 0.25,
        shadowRadius: 55,
      },
      android: {
        elevation: 8, // Adjust this value for desired effect
      },
    }), // Ensure elevation is set to 0 for iOS shadow
  },
  "box-calen": {
    ...Platform.select({
      ios: {
        shadowColor: "rgba(99, 99, 99, 0.2)",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 3, // Adjust this value to simulate the shadow effect
      },
    }),
  },
  defaultBox: {
    // Default styles can be added here
    height: 100, // Example height
    
  },
});

export default UpcomingScreen;
