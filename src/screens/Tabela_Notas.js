import React, { Component } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { server, showError, server_teste} from '../common'
import commonStyles from '../commonStyles'

 
export default class ExampleOne extends Component {
  componentDidMount = async () => {
    this.getTabela()
  }

  getTabela = async () => {
    try { 
      
      const res_notas = await axios.get(`${server}/direcao/tabela`)
      
      
      //const temp = JSON.stringify(res.data)

      this.setState({ notas: res_notas.data.data })
      //Alert.alert(JSON.stringify(res_notas.data.data))

      let array2 = []
      this.state.notas.map((nota) => {
        let array = []
        array.push(nota.nota)
        array.push(nota.alunos.nome_aluno)
        array.push(nota.modulos.disciplina.nome_disciplina)
        
        array2.push(array)       
      });

      this.setState({ tableData: array2 })

    } catch(e) {
        showError(e)
    }
  }

  constructor(props) {
    
    super(props);
    this.state = {
      notas : [],
      tableHead: ['Nota', 'Aluno', 'Disciplina'],
      tableData: []
    }
  }
 
  render() {
    const state = this.state;
  
    return (
      <View style={styles.container}>
        <ScrollView>
        <Text style={styles.subtitle}>Todas as Notas</Text>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
            <Rows data={state.tableData} textStyle={styles.text}/>
          </Table>
        </ScrollView>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  subtitle: {
    textAlign:'center',
    fontFamily: commonStyles.fontFamily,
    color: 'black',
    fontSize: 20,
    marginBottom: 15
},
});