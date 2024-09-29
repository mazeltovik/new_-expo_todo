import { TaskType } from '../types/activeTackType';
import { DeleteTaskType } from '@/types/deleteTaskType';
import {View, Text, StyleSheet, Button, Pressable} from 'react-native';

export default function ActiveTask({
    id,
    task,
    request,
    setMethod
  }: {
    id:string,
    task:string,
    request: <B>(method: string, body: B) => Promise<void>,
    setMethod: React.Dispatch<React.SetStateAction<string>>
  }) {
    return (
        <View style={styles.wrapper}>
                <Text style={styles.text}>{task}</Text>
                <View style={styles.buttonContainer} id={`active_${id}`}>
                    <Button title="Done!" color={'#41d219'} onPress={()=>{
                        setMethod('put');
                        request<{ id: string }>('put', { id });

                    }}></Button>
                    <Button title="Remove task" color={'#c72222'} onPress={()=>{
                        setMethod('delete');
                        request<DeleteTaskType>('delete', { type:'active', id })
                    }}></Button>
                </View>
        </View>
    )
  }

  const styles = StyleSheet.create({
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'flex-end',
        gap:10
    },
    wrapper:{
        borderWidth:1,
        padding:5,
        borderRadius:5,
    },
    text:{
        paddingBottom:5
    }
});