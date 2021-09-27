## 1. 复制对象提交Obiect.assign()
```
// 父级
addAddress = (val,index) => {
    const { form } = this.props;
    form.validateFieldsAndScroll((err,values) => {
        this.setState({
            formValue: values
        })
    })

    this.setState({
        isShowAddress: true,
        recordVal: val,
        index
    })

}
onConfirm={this.addAddressConfirm}  字传父
addAddressConfirm = (val)=>{
    let storages = [...this.state.storages];
    storages[this.state.index===undefined? storages.length:this.state.index ] = val;
    this.setState({
        isShowAddress: false,
        storages
    })
}


// 子集
handleSureClick = () => {
    const { form, dispatch, contacts, formValue, recordVal, storages, id, onCancel,onConfirm} = this.props;
    const defaultFlag = storages && storages.length > 0 ? '0' : '1'

    form.validateFields((err, values) => {
        console.log(values)
        console.log(recordVal)
        if(!err) {
            onConfirm(Object.assign({
                    defaultFlag: defaultFlag
                }, recordVal,{
                contactName: values.contactName,
                contactPhone: values.contactPhone,
                postcode: values.postcode,
                address: values.address,
                prov: values.name[0] || recordVal.prov || '',
                provName: this.state.nameAll.length !=0 && this.state.nameAll[0].label || recordVal.provName || '',
                city: values.name[1] || recordVal.city ||  '',
                cityName: this.state.nameAll.length !=0 && this.state.nameAll[1].label || recordVal.cityName ||  '',
                area: values.name[2] || recordVal.area ||  '',
                areaName: this.state.nameAll.length !=0 && this.state.nameAll[2].label || recordVal.areaName ||  '',

                // prov: values.name[0] || '',
                // provName: this.state.nameAll[0].label || '',
                // city: values.name[1] || '',
                // cityName: this.state.nameAll[1].label || '',
                // area: values.name[2] || '',
                // areaName: this.state.nameAll[2].label || '',
            }));
        }
    });
}




Object.assign(
                        {}, 
                        this.state.params, 
                        { 
                            num: this.state.putInHighSeasonValue,
                            classes: type,
                            userId: userInfo.userId 
                        }
                    )


```

## 2. Object.keys()  // 有默认排序 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 
```
const { dataSource } = this.props
var a = {}, b = dataSource && Object.keys(dataSource[0]);
dataSource.map(item=>{
    b.map(key=>{
        if(!a[key] && typeof(item[key]) == 'number'){
            a[key] = 0
        }
        if(typeof(item[key]) == 'number'){
            a[key] += item[key]
        }
    })
})



getPlanList() {
    const { repaymentInfo } = this.props
    const { billDay, repayPlanDetailList, repayPlanList } = repaymentInfo
    // 传值类型不统一
    // table-1
    if (repayPlanList && repayPlanList.length >= 1) {
      var a = {}, b = repayPlanList && Object.keys(repayPlanList[0]);
      repayPlanList.map(item => {
        // 解决后端传值类型问题
        item.amount = Number(item.amount)
        // item.extraAmount = Number(item.extraAmount)
        item.realAmount = Number(item.realAmount)
        item.reduceAmount = Number(item.reduceAmount)
        item.penaltyInterest = Number(item.penaltyInterest)
        b.map(key => {
          if (!a[key] && typeof (item[key]) == 'number') {
            a[key] = 0
          }
          if (typeof (item[key]) == 'number') {
            a[key] += item[key]
          }
        })
      })
      const arr = []
      arr.push(a)
      delete arr[0].state
      delete arr[0].overdueDays
      delete arr[0].period
      delete arr[0].overdueState
      delete arr[0].repayType
      if (Object.keys(a).length) {
        const b = repayPlanList.concat(arr);
        this.hasAll = b;
      }
    }
```

## 3. 异步方法
```
handleSave = () => {
        return new Promise((r,j) => {
            console.log(this.planInfo)
            const { reviewNo, dataDeil } = this.state
            const { dispatch } = this.props

            const creditScore = this.planInfo && this.planInfo.props && this.planInfo.props.creditScore || dataDeil && dataDeil.baseInfo.creditScore || ''
            const regu = /^[1-9]\d*|0$/
            if (creditScore && (!regu.test(creditScore))) return message.warn('请填写正确的芝麻信用分')

            dispatch({
                type: 'reviewRisk/handSaveCreditScore',
                payload: {
                    reviewNo: reviewNo,
                    creditScore: this.planInfo && this.planInfo.props && this.planInfo.props.creditScore || dataDeil && dataDeil.baseInfo.creditScore || ''
                },
                callback: (res) => {
                    message.success('芝麻信用分保存成功')
                    dispatch({
                        type: 'reviewRisk/handSaveTemp',
                        payload: {
                            reviewNo: reviewNo,
                            reviewStep: 40,
                            remark: this.planInfo && this.planInfo.props && this.planInfo.props.manualRecheckInfo || dataDeil && dataDeil.manualRecheckInfo.remark || ''
                        },
                        callback: (res) => {
                            message.success('备注保存成功')
                            r();
                        }
                    })
                }
            })
            this.setState({ btnSaveLoading: true })
            setTimeout(() => { this.setState({ btnSaveLoading: false }) }, 3000);
        });

    }



handleOnSubmitClick = async () => {
        const { dataDeil } = this.state
        if (this.state.showModal == '') return message.warn('请选择提交类型')
        if ((this.planInfo && this.planInfo.props && this.planInfo.props.creditScore || dataDeil && dataDeil.baseInfo.creditScore) && (this.planInfo && this.planInfo.props && this.planInfo.props.manualRecheckInfo || dataDeil && dataDeil.manualRecheckInfo.remark)) {
            await this.handleSave()
            if (this.state.showModal == '1') {
                this.child.handleSureClick()
            }
            if (this.state.showModal == '2') {
                this.child.handleSureClick()
            }
            this.setState({ btnLoading: true })
            setTimeout(() => { this.setState({ btnLoading: false }) }, 3000);
        } else {
            message.warn('芝麻分和备注不能为空')
        }
    }
```
