import React from 'react';
import { List, Datagrid, TextField, ReferenceField, EditButton, FunctionField } from 'react-admin';
import { Edit, SimpleForm, DisabledInput, ReferenceInput, SelectInput, TextInput, LongTextInput} from 'react-admin';
import { DeleteButton, Create, Show, SimpleShowLayout, DateField, RichTextField } from 'react-admin';

export const adminPostList = props => (
    <List title={<div>系統使用帳戶管理介面</div>} {...props}>
        <Datagrid rowClick="show">
            <TextField label="帳號" source="username"/>
            <TextField label="姓名" source="name" />
            <TextField label="部門" source="department"/>
            <TextField label="辦公室電話" source="phone"/>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const adminPostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label="帳號" source="username"/>
            <TextInput label="密碼" source="password" type="password"/>
            <TextInput label="姓名" source="name" />
            <TextInput label="部門" source="department"/>
            <TextInput label="Email" source="email"/>
            <TextInput label="辦公室電話" source="phone"/>
            <TextInput label="身份" source="identity"/>
        </SimpleForm>
    </Create>
);

export const adminPostEdit = props => (
      <Edit title={<div>帳戶編輯</div>} {...props}>
          <SimpleForm>
            <DisabledInput label="姓名" source="name" />
            <DisabledInput label="帳號" source="username"/>
            <TextInput label="密碼" source="password" type="password"/>
            <TextInput label="部門" source="department"/>
            <TextInput label="Email" source="email"/>
            <TextInput label="辦公室電話" source="phone"/>
            <TextInput label="身份" source="identity"/>
          </SimpleForm>
      </Edit>
);

export class adminPostShow extends React.Component {
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
  PostTitle = ({ record }) => {
        return <span>User: {record ? `${record.username}` : ''}</span>;
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
    <Show title={ <this.PostTitle /> }  {...this.props}>
        <SimpleShowLayout>
            <TextField label="帳號" source="username"/>
            <TextField label="姓名" source="name" />
            <TextField label="部門" source="department"/>
            <TextField label="Email" source="email"/>
            <TextField label="辦公室電話" source="phone"/>
            <TextField label="身份" source="identity"/>
        </SimpleShowLayout>
    </Show>
);
  }
}

// export class PostShow extends React.Component {
// 
//   render() {  // Data
//   return(
//       <Show {...this.props}>
//           <SimpleShowLayout>
//               <TextField source="title" />
//               <TextField source="id" />
//               <RichTextField source="body" />
//               <DateField label="Publication date" source="created_at" />
//           </SimpleShowLayout>
//       </Show>
//   );}
// };
