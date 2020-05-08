import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Keyboard, StyleSheet } from 'react-native';
import { Button, List, ListItem, Icon } from 'native-base';

let id = 0;

class Home extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            inputValue: ''
        }
    }

    inputChange = (inputValue) => {
        this.setState({ inputValue: inputValue })
    }

    submitItem = () => {
        if (this.state.inputValue.match(/^\s*$/)) {
            return
        }
        const text = this.state.inputValue;
        this.setState({ items: [...this.state.items, {id: id++, text: text}], inputValue: ''})
    }

    deleteItem = (item) => {
        const newItem = [...this.state.items];
        const prevIndex = this.state.items.findIndex(data => data.id === item.id)
        newItem.splice(prevIndex, 1);
        this.setState({ items: newItem })
    }

    navigate = (items) => {
        if (items.length === 0 || items.length === 1) {
            console.log('Empty')
            return
        }
        Keyboard.dismiss()
        this.props.navigation.navigate("Roulette", {
            participants: items.map((item) => { return item.text })
        })
    }

    render() {
        const { inputValue, items } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.inputBox}>
                    <TextInput
                        value={inputValue}
                        placeholder='PLEASE ADD AT LEAST TWO ITEMS'
                        style={{color: '#FBFFB9', fontSize: 16}}
                        onChangeText={(text) => this.inputChange(text)}/>
                </View>
                <ScrollView style={{marginTop: 20, marginHorizontal: 20}}>
                    <List>
                        {
                            items.map((item, i) => {
                                return (
                                    <ListItem 
                                        key={i}
                                        style={{justifyContent: 'space-between'}}>
                                        <Text style={styles.itemText}>{item.text}</Text>
                                        <Button
                                            transparent
                                            onPress={() => this.deleteItem(item)}>
                                            <Icon active name="trash" style={{color: '#754F44'}}/>
                                        </Button>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </ScrollView>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 25}}>
                    <Button 
                        transparent
                        style={styles.button}
                        onPress={() => this.submitItem()}>
                        <Text style={styles.buttonText}>Add Item</Text>
                    </Button>
                    <Button
                        transparent
                        style={styles.button}
                        onPress={() => this.navigate(items)}>
                        <Text style={styles.buttonText}>Run Roulette</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDD692'
    },
    button: {
        backgroundColor: '#754F44',
        width: 140,
        justifyContent: 'center',
        borderRadius: 25,
    },
    buttonText: {
        color: "#FBFFB9",
        fontSize: 20
    },
    inputBox: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderColor: '#754F44',
        backgroundColor: '#d6b478'
    },
    itemText: {
        color: '#754F44',
        fontSize: 25,
        fontWeight: 'bold'
    }
})

export default Home;