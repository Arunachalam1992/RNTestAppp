/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, StatusBar, RefreshControl, Alert, Animated, Platform, Dimensions } from 'react-native'

import { BottomSheet } from 'react-native-btr';
import { Iconviewcomponent } from './src/components/Icontag';

const CategoryData = require('./assets/JsonFIles/list_category.json');
const BrandData = require('./assets/JsonFIles/list_brand.json');
const ModelData = require('./assets/JsonFIles/list_models.json');
const ProductsData = require('./assets/JsonFIles/list_products.json');
// console.log("producrs -------- : ",JSON.stringify(ProductsData[0].product_images));

function App(props) {
  // const [images, setimages] = useState([
  //   require('./ProductsDataassets/images/bear.png'),
  //   require('./assets/gallery/teddy.jpg'),
  //   require('./assets/images/loc1.png'),
  //   require('./assets/gallery/teddy.jpg'),
  //   require('./assets/images/bear.png')
  // ]);
  const [catData, setCatData] = useState([]);
  const [brabdData, setBrandData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [productData, setProductData] = useState(ProductsData);

  const [selectItem, setSelectItem] = useState(1);
  const [bottombtnClick, setBottombtnClick] = useState(false);
  const [selectedItem_state, setselectedItem_state] = useState(0);
  const [changebottomSheetVisible, setchangebottomSheetVisible] = useState(false);

  function renderListitem(item, index) {
    try {
      // console.log("item ================ : ",JSON.stringify(item));
      return (
        <View
          style={{
            height: 170, width: 130, backgroundColor: 'white', margin: 3,
            borderWidth: 1,
            borderColor: '#d35647', alignItems: 'center'
          }}>
          <View style={{ width: 130, height: 130, alignItems: 'center' }}>
            <Image source={require('./assets/images/dummy.png')} /* Use item to set the image source */
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={{ flex: 5, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 12, color: 'black', padding: 3 }} numberOfLines={1}>{item.product_name}</Text>
              <Text style={{ fontSize: 10, color: '#666', paddingHorizontal: 4 }} numberOfLines={1}>{item.product_subtitle}</Text>
            </View>
            <View style={{ flex: 3, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 14, color: 'black', padding: 3 }} numberOfLines={1}>{item.product_price}</Text>
              <Text style={{ fontSize: 10, color: '#666', paddingHorizontal: 4 }} numberOfLines={1}>Price</Text>
            </View>
          </View>
        </View>
      )

    } catch (error) {
      console.log("Catch in renderListitem : ", error);
    }
  }

  /*  ****************************************************************************************************  */


  /* ********************************   Bottomsheet Start ******************************************************  */

  function change_toggleBottomView(button) {
    try {
      setBottombtnClick(button);
      setchangebottomSheetVisible(!changebottomSheetVisible);

    } catch (error) {
      console.log("catch in change_bottom : ", error);
    }
  }

  function change_BottomSheetmenu() {
    try {
      return (
        <View>
          <BottomSheet
            visible={changebottomSheetVisible}
            onBackButtonPress={change_toggleBottomView}
            onBackdropPress={change_toggleBottomView}>
            <View style={{
              backgroundColor: 'white', width: '100%', height: 300, alignItems: 'center', borderTopStartRadius: 20, borderTopEndRadius: 20
            }}>
              <View style={{ width: '100%', height: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, }}>
                  <Text style={{ fontSize: 18, color: 'black', fontWeight: '900', padding: 1 }}>Select Templates</Text>
                  <TouchableOpacity onPress={() => change_toggleBottomView()} style={{ padding: 5, backgroundColor: 'black', borderRadius: 15, paddingHorizontal: 10 }} >
                    <Text style={{ color: 'white' }}>Close</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></View>

                <View style={{ width: '100%', height: 240 }}>
                  {bottombtnClick == "Category" ?
                    <FlatList
                      data={CategoryData}
                      keyExtractor={item => item.category_id}
                      renderItem={({ item, index }) => renderCatitem(item, index)}
                    /> :
                    null}

                  {bottombtnClick == "Brand" ?
                    <FlatList
                      data={BrandData}
                      keyExtractor={item => item.brand_id}
                      renderItem={({ item, index }) => renderBrandItem(item, index)}
                    /> :
                    null}

                  {bottombtnClick == "Model" ?
                    <FlatList
                      data={ModelData}
                      keyExtractor={item => item.model_id}
                      renderItem={({ item, index }) => renderModelItem(item, index)}
                    /> :
                    null}

                </View>
              </View>
            </View>
          </BottomSheet>
        </View>
      );
    } catch (error) {
      console.log("catch in change_BottomSheetmenu : ", error);
    }
  }

  function renderCatitem(item, index) {
    try {
      return (
        <View style={{ width: '100%' }}>
          <TouchableOpacity onPress={() => selectCatProcess(item, index)}
            style={{ width: '100%', justifyContent: 'center', alignItems: 'center', padding: 15, backgroundColor: index == selectedItem_state ? '#f5f5f5' : 'white' }}>
            <Text style={{ fontSize: 14, color: index == selectedItem_state ? 'black' : '#707070' }}>{item.name}</Text>
          </TouchableOpacity>
          <View style={{ width: '100%', height: 1, alignItems: 'center', backgroundColor: '#e5e5e5' }}></View>
        </View>
      );

    } catch (error) {
      console.log("catch in renderCatitem : ", error);
    }
  }

  function selectCatProcess(item, index) {
    try {
      setCatData(item);
      let temp_arr = [];
      for (let i = 0; i < ProductsData.length; i++) {
        if (item.category_id == ProductsData[i].product_category) {
          temp_arr.push(ProductsData[i])
        }
        setProductData(temp_arr);
      }

      setselectedItem_state(index);
      change_toggleBottomView();
    } catch (error) {
      console.log("Catch in List's selectCatProcess : ", error);
    }
  }


  function renderBrandItem(item, index) {
    try {
      return (
        <View style={{ width: '100%' }}>
          <TouchableOpacity onPress={() => selectBrandProcess(item, index)}
            style={{ width: '100%', justifyContent: 'center', alignItems: 'center', padding: 15, backgroundColor: index == selectedItem_state ? '#f5f5f5' : 'white' }}>
            <Text style={{ fontSize: 14, color: index == selectedItem_state ? 'black' : '#707070' }}>{item.name}</Text>
          </TouchableOpacity>
          <View style={{ width: '100%', height: 1, alignItems: 'center', backgroundColor: '#e5e5e5' }}></View>
        </View>
      );

    } catch (error) {
      console.log("catch in renderBrandItem : ", error);
    }
  }

  function selectBrandProcess(item, index) {
    try {
      setBrandData(item.name);
      setselectedItem_state(index);
      let temp_arr = [];
      for (let i = 0; i < ProductsData.length; i++) {
        if (item.brand_id == ProductsData[i].product_brand) {
          temp_arr.push(ProductsData[i])
        }
        setProductData(temp_arr);
      }

      change_toggleBottomView();
    } catch (error) {
      console.log("Catch in List's selectBrandProcess : ", error);
    }
  }


  function renderModelItem(item, index) {
    try {
      return (
        <View style={{ width: '100%' }}>
          <TouchableOpacity onPress={() => selectModelProcess(item, index)}
            style={{ width: '100%', justifyContent: 'center', alignItems: 'center', padding: 15, backgroundColor: index == selectedItem_state ? '#f5f5f5' : 'white' }}>
            <Text style={{ fontSize: 14, color: index == selectedItem_state ? 'black' : '#707070' }}>{item.model_name}</Text>
          </TouchableOpacity>
          <View style={{ width: '100%', height: 1, alignItems: 'center', backgroundColor: '#e5e5e5' }}></View>
        </View>
      );

    } catch (error) {
      console.log("catch in renderModelItem : ", error);
    }
  }

  function selectModelProcess(item, index) {
    try {
      setModelData(item.model_name);
      setselectedItem_state(index);
      let temp_arr = [];
      for (let i = 0; i < ProductsData.length; i++) {
        if (item.model_id == ProductsData[i].product_model) {
          temp_arr.push(ProductsData[i])
        }
        setProductData(temp_arr);
      }
      change_toggleBottomView();
    } catch (error) {
      console.log("Catch in List's selectModelProcess : ", error);
    }
  }


  /* **************************************** END ************************************************************** */

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor={'white'}
          translucent={false}
          barStyle='dark-content'
          networkActivityIndicatorVisible={true} />

        <View style={{ width: '100%', backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: Platform.OS == 'android' ? 0 : 40, }}>
          <View style={{ backgroundColor: 'white', flexDirection: 'row', }}>
            <TouchableOpacity style={{ padding: 10 }}>
              <Iconviewcomponent
                Icontag={'Feather'}
                iconname={'menu'}
                icon_size={25}
                icon_color={'black'} />
            </TouchableOpacity>
            <View style={{ padding: 10 }}>
              <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', }}>Templates</Text>
            </View>
          </View>
          <TouchableOpacity style={{ marginEnd: 20 }}>
            <Iconviewcomponent
              Icontag={'Entypo'}
              iconname={'dots-three-vertical'}
              icon_size={15}
              iconstyle={{ color: '#707070' }} />
          </TouchableOpacity>
        </View>


        <View style={{ alignItems: 'center', marginTop: 10 }}>

          <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { setSelectItem(1), change_toggleBottomView("Category") }}
              style={{ padding: 10, paddingHorizontal: 30, borderRadius: 20, marginHorizontal: 5, backgroundColor: selectItem === 1 ? '#e5e5e5' : 'white', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: 'black' }}>Category</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setSelectItem(2), change_toggleBottomView("Brand") }}
              style={{ padding: 10, paddingHorizontal: 30, borderRadius: 20, marginHorizontal: 5, backgroundColor: selectItem === 2 ? '#e5e5e5' : 'white', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: 'black' }}>Brand</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setSelectItem(3), change_toggleBottomView("Model") }}
              style={{ padding: 10, paddingHorizontal: 30, borderRadius: 20, marginHorizontal: 5, backgroundColor: selectItem === 3 ? '#e5e5e5' : 'white', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: 'black' }}>Model</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
            <FlatList
              data={productData}
              numColumns={3}
              renderItem={({ item, index }) => renderListitem(item, index)}
            />
          </View>

        </View>
        {change_BottomSheetmenu()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f3f3',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  bottomViewstyle: {
    width: '100%', height: 40, flexDirection: 'row', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'
  },
  bottomTouchViewstyle: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  bottomTabtextstyle: {
    fontSize: 12,
  },
});

export default App;
