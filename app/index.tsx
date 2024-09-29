import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import CreateTaskInput from '@/components/createTask';
import AllActiveTask from '@/components/allActiveTask';
import AllDoneTask from '@/components/allDoneTask';
import { TaskType } from '../types/activeTackType'
import { AllTask } from '../types/allTaskType';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import IP from '@/constants/ip';
import { ToastProvider } from 'react-native-toast-notifications'
import { useToast } from "react-native-toast-notifications";

export default function Index() {
  const [activeTask, setActiveTask] = useState<TaskType[]>([]);
  const [doneTask, setDoneTask] = useState<TaskType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  useEffect(() => {
    async function getAll() {

      try {
        setLoading(true);
        const response = await axios.get<AllTask>(
          `http://${IP}:3000/tasks`
        );
        if (response) {
          console.log(response.data);
          setActiveTask(response.data.activeTask);
          setDoneTask(response.data.doneTask);
        }
      } catch(err){
        if(isAxiosError(err)){
          const errMsg = err.response?.data?.err as string;
        toast.show(`${errMsg}`, {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          animationType: "slide-in",
        });
        console.log("Data fetching cancelled");
        }
      } finally {
        setLoading(false);
      }
    }
    getAll();
  }, []);
  return (
    <ToastProvider>
          <ScrollView>
      <View style={styles.wrapper}>
      <View style={styles.container}>
      <CreateTaskInput 
          activeTask={activeTask}
          setActiveTask={setActiveTask}/>
      <AllActiveTask 
        doneTask={doneTask}
        setActiveTask={setActiveTask}
        setDoneTask={setDoneTask}
        isLoading={isLoading}
        allActiveTask={activeTask} 
      />
      <AllDoneTask
          allDoneTask={doneTask}
          isLoading={isLoading}
          setDoneTask={setDoneTask}
        />
      </View>
    </View>
    </ScrollView>
    </ToastProvider>

  );
}

const styles = StyleSheet.create({
  wrapper:{

  },
  container: {
    marginTop: 20,
    justifyContent:'center',
    marginLeft:16,
    marginRight:16
  },
});
