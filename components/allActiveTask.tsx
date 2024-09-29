import { useEffect, useState } from 'react';
import ActiveTask from './activeTask';
import { TaskType } from '../types/activeTackType';
import useFetch from '../hooks/useFetch';
import { DeleteTaskType } from '../types/deleteTaskType';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import IP from '@/constants/ip';

export default function AllActiveTask({
    allActiveTask,
    doneTask,
    isLoading,
    setActiveTask,
    setDoneTask,
  }: {
    allActiveTask: TaskType[];
    doneTask: TaskType[];
    isLoading: boolean;
    setActiveTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
    setDoneTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
  }) {
    const [method, setMethod] = useState('');
    const { data, request } = useFetch<TaskType>(`http://${IP}:3000/tasks`);
    useEffect(() => {
      if (data) {
        if (method == 'delete') {
          setActiveTask(allActiveTask.filter((task) => task.id !== data.id));
        } else {
          setActiveTask(allActiveTask.filter((task) => task.id !== data.id));
          setDoneTask([...doneTask, data]);
        }
      }
    }, [data]);
    return (
         <View style={styles.wrapper}
        >
            <Text>{isLoading ? 'Loading...' : `You have: ${allActiveTask.length} active tasks`}</Text>
           {
                allActiveTask.map(({task,id})=>{
                    return <ActiveTask task={task} id={id} key={id} request={request} setMethod={setMethod}/>;
                })
            }
        </View>
    )
  }


  const styles = StyleSheet.create({
    wrapper:{
        gap:10,
        marginTop:10,
        backgroundColor:'#f0ede6',
        borderRadius:5,
        padding:5
    },
});