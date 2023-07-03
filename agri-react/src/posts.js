import React from 'react';
import { Create, List, Datagrid, TextField, ReferenceField, EditButton, FunctionField } from 'react-admin';
import { Edit, SimpleForm, DisabledInput, ReferenceInput, SelectInput, TextInput, LongTextInput} from 'react-admin';
import { DeleteButton, UrlField, FileField, FileInput, Show, SimpleShowLayout, DateField, RichTextField } from 'react-admin';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';


export const PostList = props => (
    <List title={<span>案件清單</span>} {...props}>
        <Datagrid rowClick="show">
            <TextField label="供應商" source="bidname"/>
            <TextField label="供應商提供商品" source="commodity"/>
            <TextField label="數量" source="bidamount"/>
            <TextField label="單價" source="bidprice"/>
            <TextField label="指定交易" source="bidspecified"/>
            <EditButton label=""/>
	    <DeleteButton label=""/>
        </Datagrid>
    </List>
);

export const PostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label="供應商" source="bidname"/>
            <TextInput label="供應商提供商品" source="commodity"/>
            <TextInput label="數量" source="bidamount"/>
            <TextInput label="單價" source="bidprice"/>
            <TextInput label="指定商家" source="bidspecified"/>
            <TextInput label="指定交易" source="askname"/>
            <TextInput label="商指定交易品" source="a_commodity"/>
            <TextInput label="數量" source="askamount"/>
            <TextInput label="單價" source="askprice"/>
            <TextInput label="指定商家" source="askspecified"/>
        </SimpleForm>
    </Create>
);

export const PostEdit = props => (
      <Edit {...props}>
          <SimpleForm>
            <TextInput label="供應商" source="bidname"/>
            <TextInput label="供應商提供商品" source="commodity"/>
            <TextInput label="數量" source="bidamount"/>
            <TextInput label="單價" source="bidprice"/>
            <TextInput label="指定商家" source="bidspecified"/>
            <TextInput label="指定交易" source="askname"/>
            <TextInput label="商指定交易品" source="a_commodity"/>
            <TextInput label="數量" source="askamount"/>
            <TextInput label="單價" source="askprice"/>
            <TextInput label="指定商家" source="askspecified"/>
          </SimpleForm>
      </Edit>
);


// function a(data, len, c) { 
// 	var f = [];
// 	for (var i=0; i<len; i++) {
// 		var h = data["hash"][i]
// 		var im = data["imghash"][i]
// 		this.b(h, im, c);
// 	};
// };

export class PostShow extends React.Component {
  state = {
    loading: true,
    data: null
  };
b(tx_h, h, c) {
	console.log("https://ropsten.etherscan.io/tx/" + tx_h)
	fetch("https://ropsten.etherscan.io/tx/" + tx_h).
	then((response) => { 
	if (response.status == 200) { return response.text();}
	else if (response.status == 500) {
		window.alert("Something Wrong!!");
		return;}
	else { window.alert("Server Error! Call Engineers!");
		return; }})
	.then((response) => {
	var domparser = new DOMParser()
	var doc = domparser.parseFromString(response, "text/html")
	var hash = doc.getElementById("inputdata")
    	if (hash == null || hash == undefined) {
	    window.alert("資料正在上鏈，請稍候");
	    return;
	}
	hash = hash.innerHTML
    	if (hash == null || hash == undefined) {
	    window.alert("資料正在上鏈，請稍候");
	    return;
	}
	hash = hash.split("\n")[4].split(" ")[2]
	if (hash == h) {
		window.alert("資料無竄改紀錄");
		return;
	}
	else {
		window.alert("警告：資料被竄改");
		c.failure = 1;
		return;
	}
	}
	)
};
PostShowActions = ({ basePath, data, resource }) => (
  <CardActions style={this.cardActionStyle}>
  <Button color="primary" onClick={
  async () => {
    if ( data["id"] == "") {
      window.alert("No Hash Yet!!");
      return;
    }
    else {
	var tx_h;
	var h;
	fetch("http://52.90.64.113:8000/verifyhash/" + data["id"]).
	then((response) => { 
	if (response.status == 200) { return response.text();}
	else if (response.status == 500) {
		window.alert("verify Something Wrong!!");
		return;}
	else { window.alert("verify Server Error! Call Engineers!");
		return; }})
		.then((response) => {
		tx_h = response.split(" ")[0]
		h = response.split(" ")[1]
		console.log(h)
	        var x = {'failure': 0};
		this.b(tx_h, h, x)
	})
      // var len = data["hash"].length
    }
  }
  }>檢查資料正確性</Button>
  <EditButton basePath={basePath} record={data} />
  </CardActions>
);

  async componentDidMount() {
    const url = "http://52.90.64.113:8000/post";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ data: data, loading: false });
  }

  PostTitle = ({ record }) => {
        return <span><span>案件代號: {record ? `${record.id}` : ''}(隨機產生)</span></span>;
  };

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.data) {
      return <div>didn't get a data</div>;
    }
    // Data
    return (
    <Show title={< this.PostTitle/>} {...this.props} actions={<this.PostShowActions />}>
        <SimpleShowLayout>
            <TextField label="建立時間" source="date"/>
            <TextField label="供應商提供商品" source="commodity"/>
            <TextField label="供應商" source="bidname"/>
            <TextField label="數量" source="bidamount"/>
            <TextField label="單價" source="bidprice"/>
            <TextField label="指定商家" source="bidspecified"/>
            <TextField label="指定交易" source="askname"/>
            <TextField label="商指定交易品" source="a_commodity"/>
            <TextField label="數量" source="askamount"/>
            <TextField label="單價" source="askprice"/>
            <TextField label="指定商家" source="askspecified"/>
            <UrlField  label="區塊鏈資料" source="txurl"/>
        </SimpleShowLayout>
    </Show>
);
  }
}
