import { useState, useEffect } from 'react';
import useFetch from '@/hooks/useFetch';
import {View, TextInput, StyleSheet, Button} from 'react-native';
import { CreateTask } from '../types/createTaskType';
import { TaskType } from '../types/activeTackType';
import IP from '@/constants/ip';


export default function CreateTaskInput({
    activeTask,
    setActiveTask,
  }: CreateTask){
    const [task, onChangeTask] = useState('');
    const { data, isLoading, request } = useFetch<TaskType>(
        `http://${IP}:3000/tasks`
      );
      useEffect(() => {
        if (data) {
          onChangeTask('');
          setActiveTask([...activeTask, data]);
        }
      }, [data]);
    return (
        <View style={styles.wrapper}>
            <TextInput style={styles.input}
            placeholder='Create task...'
            onChangeText={onChangeTask}
            value={task}/>
            <Button title="Sumbit" disabled={isLoading} onPress={()=>{
                request<Omit<TaskType, 'id'>>('post', { task, isCompleted: false });
            }}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    input: {
      borderWidth: 1,
      padding: 10,
      flex:0.9
    },
});