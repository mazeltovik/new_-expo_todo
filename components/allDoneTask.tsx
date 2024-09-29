import { useEffect } from 'react';
import CompletedTask from './completedTask';
import { TaskType } from '../types/activeTackType';
import useFetch from '../hooks/useFetch';
import { DeleteTaskType } from '../types/deleteTaskType';
import { View, StyleSheet, Text } from 'react-native';
import IP from '@/constants/ip';
export default function AllDoneTask({
    allDoneTask,
    isLoading,
    setDoneTask,
  }: {
    allDoneTask: TaskType[];
    setDoneTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
    isLoading: boolean;
  }) {
    const { data, request } = useFetch<TaskType>(`http://${IP}:3000/tasks`);
    useEffect(() => {
    if (data) {
      setDoneTask(allDoneTask.filter((task) => task.id !== data.id));
    }
  }, [data]);
  return (
    <View style={styles.wrapper} onPointerEnter={(event)=>{
        const target = event.target as unknown as HTMLElement;
        const parent = target.parentNode;
        if(parent?.nodeName == 'BUTTON'){
            const view = parent.parentNode;
            if(view){
                const [type, id] = (view as HTMLElement).id.split('_');
                request<DeleteTaskType>('delete', { type, id });
            }
        } else return;
    }}>
        <Text>{isLoading ? 'Loading...' : `You have: ${allDoneTask.length} done tasks`}</Text>
        {allDoneTask.map(({ id, task }) => {
            return <CompletedTask task={task} id={id} key={id} request={request}/>;
          })}
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