import { DeleteTaskType } from '@/types/deleteTaskType';
import {View, Text, StyleSheet, Button} from 'react-native';

export default function CompletedTask({
    id,
    task,
    request
  }: {
    id:string,
    task:string,
    request: <B>(method: string, body: B) => Promise<void>,
  }) {
    return (
        <View style={styles.wrapper}>
                <Text style={styles.text}>{task}</Text>
                <View style={styles.buttonContainer} id={`done_${id}`}>
                    <Button title="Remove task" color={'#c72222'} onPress={()=>request<DeleteTaskType>('delete', { type:'done', id })}></Button>
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
        paddingBottom:5,
        textDecorationLine:'line-through'
    }
});