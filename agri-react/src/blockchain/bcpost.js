import React from 'react';
import { Create, List, Datagrid, TextField, ImageField, ReferenceField, EditButton, FunctionField } from 'react-admin';
import { ImageInput, Edit, SimpleForm, DisabledInput, ReferenceInput, SelectInput, TextInput, LongTextInput} from 'react-admin';
import { UrlField, Show, SimpleShowLayout, DateField, RichTextField ,ArrayField,ArrayInput,SimpleFormIterator} from 'react-admin';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import PropTypes from 'prop-types';


export const bcList = props => (
    <List title={<span>區塊鏈資料</span>} {...props}>
        <Datagrid rowClick="show">
            <TextField source="tag" label="案件代號"/>
            <TextField source="name" label="貸款人"/>
            <TextField source="factory" label="廠址"/>
        </Datagrid>
    </List>
);

export const bcCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="factory" label="廠址"/>
            <TextInput source="chain" label="區塊鏈名稱"/>
            <ImageInput source="image" label="Related pictures" accept="image/*">
              <ImageField source="image" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);

const MyUrlField = ({ record = {}, source }) =>
  <div>
    <div> Transaction Hash </div>
      <a className="Hey" href={"https://ropsten.etherscan.io/tx/"+record.hash}>
            {record[source]}
    </a>
</div>

function populateList(imghashs,hashs) {
    return imghashs.map((imghash,index) =>
    <div key={imghash.toString()}><a href = {"https://ropsten.etherscan.io/tx/"+hashs[index]}  key={imghash.toString()}>
        {imghash}
    </a></div>
);
   
}

const SimpleArray = ({source, record = {}}) =>
  <div>
      {
          populateList(record[source],record["hash"])
      }
  </div>;


SimpleArray.defaultProps = {
  addLabel: false,
  label: 'List'
};


SimpleArray.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string
};

export default SimpleArray;

export class bcShow extends React.Component {
  constructor(props){
    super(props);
    this.Gethash=this.Gethash.bind(this);
  }
  state = {
    loading: true,
    data: null,
    hash:false
  };

  Gethash() {
    this.setState({hash:!this.state.hash});
  }

  async componentDidMount() {
    const url = "http://52.90.64.113:8000/post";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ data: data, loading: false });
    this.Gethash = this.Gethash.bind(this);
  }

sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


b(h, im, c) {
	fetch("https://ropsten.etherscan.io/tx/" + h).
	then((response) => { 
	if (response.status == 200) {
		return response.text();}
	else if (response.status == 500) {
		window.alert("Something Wrong!!");
		return;}
	else { window.alert("Server Error! Call Engineers!");
		return; }})
	.then((response) => {
	var domparser = new DOMParser()
	var doc = domparser.parseFromString(response, "text/html")
	var hash = doc.getElementById("inputdata").innerHTML.split("\n")[4].split(" ")[2]
	if (hash == im) {
		window.alert("Success: " + im);
		return;
	}
	else {
		window.alert("Fail: "+ im);
		c.failure = 1;
		return;
	}
	}
	)
};

a(data, len, c) { 
	var f = [];
	for (var i=0; i<len; i++) {
		var h = data["hash"][i]
		var im = data["imghash"][i]
		this.b(h, im, c);
	};
};
PostTitle({ record }) {
      return <span>{record ? `案件ID: ${record.id}` : ''}</span>;
};

PostShowActions = ({ basePath, data, resource }) => (
  <CardActions style={this.cardActionStyle}>
  <Button color="primary" onClick={
  async () => {
    if ( data["hash"] == "") {
      window.alert("No Hash Yet!!");
      return;
    }
    else {
      var len = data["hash"].length
      var x = {'failure': 0};
      await this.a(data, len, x)
    }
}
}>檢查資料真偽性</Button>
    </CardActions>
  );

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.data) {
      return <div>didn't get a data</div>;
    }
    // Data
    return (
    <Show  title={< this.PostTitle/>} {...this.props} actions={<this.PostShowActions />}>
        <SimpleShowLayout>
            <TextField source="tag" label="案件代號"/>
            <TextField source="name" label="貸款人"/>
            <TextField source="factory" label="廠址"/>
            <TextField source="date" label="上鏈日期"/>
            <TextField source="chain" label="區塊鏈名稱"/>
            <TextField label="照片 Hash"/>
            {this.state.hash ? <SimpleArray source="imghash" label="照片 Hash"></SimpleArray>:<div></div>}
            {this.state.hash ? <button onClick={this.Gethash}>Close</button> : <button onClick={this.Gethash}>Open</button>}
            <TextField source="lat" label="緯度"/>
            <TextField source="long" label="經度"/>
            <TextField source="dddh" label="地段地號"/>
            <UrlField source="image" label="照片"/>
        </SimpleShowLayout>
    </Show>
  );
  }
}
