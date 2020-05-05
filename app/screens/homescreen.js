import React, { Component } from 'react';
import { Dimensions, Button, View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Partition } from '../newstyle/Partition';
import { Card } from '../newstyle/Card';
import { Badge } from '../newstyle/Badge';
import { theme, mocks } from '../constants';

import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';


const { width } = Dimensions.get("window");
// const navigation = useNavigation();

export class HomeScreen extends Component{

    state = {
        active: "Products",
        // active: "Meat & Seafood",
        categories: []
    };
    
    componentDidMount() {
        this.setState({ categories: this.props.categories })
    }

    handleTab = tab => {
        const { categories } = this.props;
        const filtered = categories.filter(category =>
          category.tags.includes(tab.toLowerCase())
        );
    
        this.setState({ active: tab, categories: filtered });
    };
    
    renderTab(tab) {
        const { active } = this.state;
        const isActive = active === tab;
    
        return (
          <TouchableOpacity
            key={`tab-${tab}`}
            onPress={() => this.handleTab(tab)}
            style={[styles.tab, isActive ? styles.active : null]}
          >
            <Text size={16} medium gray={!isActive} secondary={isActive}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      }

    render() {
        const { navigation } = this.props;
        const { categories } = this.state;
        // const tabs = ["Meat & Seafood", "Produce", "Breads & Bakery", "Beverages"];
        const tabs = ["Products", "Inspirations", "Shop"];
        return (

            <Partition>
                <Partition flex={false} center>
                    <Text style={styles.header}> ITEM CATEGORIES </Text>
                </Partition>

                <Partition flex={false} style={{flexDirection: 'row-reverse'}}> 
                    <Text style={{marginRight: 25, height: 20, width: 20, borderRadius: 10, backgroundColor: 'rgba(95,197,123,0.8)', 
                        right: 10, bottom: 10, alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                       0 
                    </Text>                   
                    <Icon onPress={() => navigation.navigate('Shopping List')} name="ios-cart" size={30} style={{...styles.icon}}/>
                </Partition>

                <Partition flex={false} row style={styles.tabs}>
                    {tabs.map(tab => this.renderTab(tab))}
                </Partition>

                <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingVertical: theme.sizes.base * 2 }}
                >
                    <Partition flex={false} row space="between" style={styles.categories}>
                        {categories.map(category => (
                        <TouchableOpacity
                            key={category.name}
                            // onPress={() => navigation.navigate("Map", { category })}
                        >
                            <Card center middle shadow style={styles.category}>
                            <Badge
                                margin={[0, 0, 15]}
                                size={50}
                                color="rgba(41,216,143,0.20)"
                            >
                                <Image source={category.image} />
                            </Badge>
                            <Text medium height={20}>
                                {category.name}
                            </Text>
                            <Text gray caption>
                                {category.count} products
                            </Text>
                            </Card>
                        </TouchableOpacity>
                        ))}
                    </Partition>
                </ScrollView>


                <Partition flex={false} center>
                    <Button onPress={() => navigation.navigate('Shopping List')} title = "Check your shopping list" />
                </Partition>
            </Partition>

            // <View style={styles.container}>
            //     <Text style={styles.text}>YOUR SHOPPING LIST</Text>
            //     {tabs.map(tab => this.renderTab(tab))}
            //     <ScrollView
            //         showsVerticalScrollIndicator={false}
            //         style={{ paddingVertical: 16 * 2 }}
            //         >
            //     </ScrollView>

            //     <Button
            //         onPress={() => this.props.navigation.navigate('Map')}
            //         title="Tap here to start"
            //     />
            // </View>
            );
        }
}

HomeScreen.defaultProps = {
    categories: mocks.categories
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    header: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        paddingHorizontal: 16 * 2
    },
    text: {
        color: "black",
        fontSize: 20,
        textAlign: "right"
    },
    icon: {
        // marginHorizontal: 32,
        textAlign: "right"
    },
    avatar: {
        height: 16 * 2.2,
        width: 16 * 2.2
    },
    tabs: {
        borderBottomColor: "#C5CCD6",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 16,
        marginHorizontal: 32
    },
    tab: {
        marginRight: 32,
        paddingBottom: 16
    },
    active: {
        borderBottomColor: "#2BDA8E",
        borderBottomWidth: 4
    },
    categories: {
        flexWrap: "wrap",
        paddingHorizontal: 32,
        marginBottom: 56
    },
    category: {
    // this should be dynamic based on screen width
        minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
    }
  })