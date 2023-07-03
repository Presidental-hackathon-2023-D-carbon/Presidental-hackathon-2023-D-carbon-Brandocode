import React from 'react';
import { Create, List, Datagrid, TextField, ImageField, ReferenceField, EditButton, FunctionField } from 'react-admin';
import { ImageInput, Edit, SimpleForm, DisabledInput, ReferenceInput, SelectInput, TextInput, LongTextInput} from 'react-admin';
import { UrlField, Show, SimpleShowLayout, DateField, RichTextField } from 'react-admin';
import Button from '@material-ui/core/Button';
import { CardActions, ShowButton } from 'react-admin';

export const photoList = props => (
    <List title={<span>區塊鏈資料</span>} {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" label="ID"/>
        </Datagrid>
    </List>
);

export const photoCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" label="ID"/>
            <ImageInput source="image" label="Related pictures" accept="image/*">
              <ImageField source="image" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);

const MyUrlField = ({ record = {}, source }) =>
  <div>
    <div> CASE ID </div>
      <a className="Hey" href={"https://ropsten.etherscan.io/tx/"+record.hash}>
            {record[source]}
    </a>
  </div>

export class photoShow extends React.Component {
  state = {
    loading: true,
    data: null
  };

  async componentDidMount() {
    const url = "http://jsonplaceholder.typicode.com/posts";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ data: data, loading: false });
    // this.setState({ data: [{Id: "002", "案件代號": "BCSLC001"}], loading: false });
  }

  PostTitle({ record }) {
        return <span>{record ? `案件ID: ${record.id}` : ''}</span>;
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
    <Show title={< this.PostTitle/>} {...this.props}>
        <SimpleShowLayout>
            <MyUrlField source="hash" label="交易Hash"/>
            <TextField source="factory" label="廠址"/>
            <TextField source="date" label="上鏈日期"/>
            <TextField source="chain" label="區塊鏈名稱"/>
            <TextField source="imghash" label="照片 Hash"/>
            <ImageField source="image" label="照片"/>
        </SimpleShowLayout>
    </Show>
  );
  }
}
