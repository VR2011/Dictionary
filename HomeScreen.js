import * as React from 'react';
import { render } from 'react-dom';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component{
    render(){
        return(
            <View>
                <Header
                    backgroundColor = '#9c8210'
                    centerComponent = {{
                    text:'Dictionary',
                        style: {
                            color: '#93e5ab',
                            fontSize: 20
                        }
                    }}
                />
                <TextInput
                    style={StyleSheet.inputBox}
                    onChangeText={text => {
                        this.setState({
                            text: text,
                            isSearchedPressed: false,
                            word: 'Loading...',
                            lexicalCategory: '',
                            examples:[],
                            defination:""
                    });
                }}
                    value={this.state.text}
              />
              <View style={styles.detailsContainer}>
                  <Text style={styles.detailsTitle}>
                    Word:{""}
                  </Text>
                  <Text style={{fontSize: 18}}>
                    {this.state.word}
                  </Text>
              </View>
              <View style={styles.detailsContainer}>
                  <Text style={styles.detailsTitle}>
                    Type:{""}
                  </Text>
                  <Text style={{fontSize: 18}}>
                    {this.state.lexicalCategory}
                  </Text>
              </View>
              <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                  <Text style={styles.detailsTitle}>
                    Definition:{""}
                  </Text>
                  <Text style={{fontSize: 18}}>
                    {this.state.definition}
                  </Text>
              </View>
              <TouchableOpacity
              style={styles.searchButton}>
              </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBox: {
        marginTop: 200,
        width: '80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 4,
        outline: 'none'
      },
      searchButton: {
        width: '20%',
        height: 55,
        alignSelf: 'center',
        padding: 10,
        margin: 10
      }
})

getWord=(word)=>{
    var searchKeyword=word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json";
    return fetch(url)
    .then((data)=>{
        if(data.status===200)
        {
          return data.json();
        }
        else{
            return null;
        }
    })
    .then((response)=>{
        var responseObject = response;
        if(responseObject){
            var wordData = responseObject.definations[0];
            var definition = wordData.description;
            var lexicalCategory = wordData.wordtype;
            this.setState({
                "word": this.state.text,
                "definition": definition,
                "lexicalCategory": lexicalCategory
            })
        }
        else{
            this.setState({
                "word": this.state.text,
                "definition": "Not Found",
            })
        }
    })
}