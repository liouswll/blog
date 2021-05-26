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
```

## 2. Object.keys()  // 有默认排序
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
```

