// pages/mall/mall.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    types: [],
    foods: [],
    toView: null,
    scrollTop: 0,
    foodViewHeight: 100,
    toView: '1',
    modalShow: false,
    modalTitle: '',
    //
    addFoodData: {},  // 增加数量的食品
    foodList: [], // 添加的食品列表
    totalPrice: 0, // 总价
    //
    dialogShow: false,
    maskClosable: true,
  },

  /**
   * 左侧导航点击
   * @param {*} event 
   */
  tapType(event) {
    const dataset = event.currentTarget.dataset;
    this.setData({
      toView: dataset.id,
    })
  },

  /**
   * 减去数量
   * @param {*} event 
   */
  subductionFood(event) {
    const dataset = event.currentTarget.dataset;
    console.log(dataset);
    let data = dataset.data;
    let foodList = this.data.foodList;
    console.log(foodList);
    if (foodList.length > 0) {
      foodList.forEach((value, index) => {
        if (data.id === value.id && data.num - 1 === value.num) {
          foodList.splice(index, 1);
        }
      })
    }
    let totalPrice = 0;
    for (let food of foodList) {
      totalPrice += Number(food.price);
    }
    //
    let foods = this.data.foods;
    for (let type of foods) {
      for (let food of type.list) {
        if (dataset.data.id === food.id) {
          food.num = food.num ? food.num - 1 : '';
        }
      }
    }
    this.setData({
      foods: foods,
      foodList: foodList,
      totalPrice: totalPrice.toFixed(2),
    })
  },

  /**
   * 添加数量
   * @param {*} event 
   */
  addFood(event) {
    const dataset = event.currentTarget.dataset;
    console.log(dataset);
    this.setData({
      modalShow: true,
      modalTitle: dataset.data.name,
      addFoodData: dataset.data,
    })
  },

  /**
   * 取消
   */
  formCancel() {
    this.setData({
      modalShow: false
    });
  },

  /**
   * 提交
   * @param {*} e 
   */
  formSubmit(e) {
    console.log(e.detail.value);  // { temperature, size }
    //
    let addFoodData = this.data.addFoodData;
    let foods = this.data.foods;
    for (let type of foods) {
      for (let food of type.list) {
        if (addFoodData.id === food.id) {
          food.num = food.num ? food.num + 1 : 1;
        }
      }
    }
    addFoodData = {
      ...addFoodData,
      ...e.detail.value,
    }
    let foodList = this.data.foodList;
    foodList.push(addFoodData);
    console.log(foodList);
    //
    let totalPrice = 0;
    for (let food of foodList) {
      totalPrice += Number(food.price);
    }
    //
    this.setData({
      modalShow: false,
      foods: foods,
      foodList: foodList,
      totalPrice: totalPrice.toFixed(2),
    });
    console.log("clicked confirm");
  },

  foodSubmit(e) {
    console.log(e);
  },

  close(e) {
    const { type } = e.currentTarget.dataset;
    if (this.data.maskClosable || type === 'close') {
      this.setData({
        dialogShow: false
      }); // 关闭弹窗回调事件
      this.triggerEvent('close');
    }
  },

  shopCart() {
    this.setData({
      dialogShow: !this.data.dialogShow
    }); // 关闭弹窗回调事件
  },

  // 购物车中删除
  cartDel(e) {
    let dataset = e.currentTarget.dataset;
    const { id, index } = dataset;
    let foodList = this.data.foodList;
    foodList.splice(index, 1);
    //
    let totalPrice = 0;
    for (let food of foodList) {
      totalPrice += Number(food.price);
    }
    //
    let foods = this.data.foods;
    for (let type of foods) {
      for (let food of type.list) {
        if (id === food.id) {
          food.num = food.num ? food.num - 1 : '';
        }
      }
    }
    this.setData({
      foodList: foodList,
      totalPrice: totalPrice,
      foods: foods
    });
  },

  // 购物车删除全部
  cartDelAll() {
    let foodList = [];
    //
    let totalPrice = 0;
    //
    let foods = this.data.foods;
    for (let type of foods) {
      for (let food of type.list) {
        food.num = 0
      }
    }
    this.setData({
      foodList: foodList,
      totalPrice: totalPrice,
      foods: foods
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
        success: (res) => {
          console.log(res);
          let scrollHeight = (750 / res.windowWidth) * res.windowHeight - 120;
          this.setData({
            foodViewHeight: scrollHeight
          });
        },
      }),
      this.setData({
        types: [
          '咖啡',
          '奶茶',
          '小吃',
          '特饮',
          '面包',
        ],
        foods: [{
            id: 1,
            name: '咖啡',
            list: [{
                id: 101,
                name: '美式咖啡',
                price: '7',
                num: 0,
                remark: '包含多种杯型选择',
                type: '1',
                src: '../../images/1.jpg'
              },
              {
                id: 102,
                name: '拿铁咖啡',
                price: '10',
                remark: '包含多种杯型选择',
                type: '1',
                src: '../../images/1.jpg'
              },
            ]
          },
          {
            id: 2,
            name: '奶茶',
            list: [{
                id: 201,
                name: '红豆奶茶',
                price: '7',
                remark: '包含多种杯型选择',
                type: '1',
                src: '../../images/1.jpg'
              },
              {
                id: 202,
                name: '招牌奶茶',
                price: '6',
                remark: '包含多种杯型选择',
                type: '1',
                src: '../../images/1.jpg'
              },
              {
                id: 203,
                name: '四季春奶茶',
                price: '6',
                remark: '包含多种杯型选择',
                type: '1',
                src: '../../images/1.jpg'
              },
              {
                id: 204,
                name: '椰果奶茶',
                price: '7',
                remark: '包含多种杯型选择',
                type: '1',
                src: '../../images/1.jpg'
              },
            ]
          },
          {
            id: 3,
            name: '小吃',
            list: [{
                id: 301,
                name: '香辣车仔面',
                price: '6',
                remark: '包含多种杯型选择',
                type: '1',
                src: '../../images/1.jpg'
              },
              {
                id: 302,
                name: '葱油车仔面',
                price: '6',
                remark: '包含多种杯型选择',
                type: '1',
                src: '../../images/1.jpg'
              },
              {
                id: 303,
                name: '康师傅红烧牛肉面',
                price: '6',
                remark: '',
                type: '2',
                src: '../../images/1.jpg'
              },
            ]
          },
          {
            id: 4,
            name: '特饮',
            list: [{
              id: 401,
              name: '柠檬水',
              price: '6',
              remark: '包含多种杯型选择',
              type: '1',
              src: '../../images/1.jpg'
            }, ]
          },
          {
            id: 5,
            name: '面包',
            list: [{
              id: 501,
              name: '手撕面包',
              price: '3',
              remark: '包含多种杯型选择',
              type: '1',
              src: '../../images/1.jpg'
            }, ]
          },
        ]
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})