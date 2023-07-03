import React from "react";

export default class simpleTable extends React.Component {
  state = {
    loading: true,
    data: null
  };

  async componentDidMount() {
    const url = "http://jsonplaceholder.typicode.com/posts";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ data: data, loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.data) {
      return <div>didn't get a data</div>;
    }
    // Data
    var dataColumns = ['ID', '案件代號', '案件名稱', '貸款人資料', '場址資料', '主要銷路', '申請日期', '申請金額', '案件進度', '書面資料', '區塊鏈資料'];
    var dataRows = [this.props]

    var tableHeaders = (<thead>
          <tr>
            {dataColumns.map(function(column) {
              return <th>{column}</th>; })}
          </tr>
      </thead>);

    var tableBody = dataRows.map(function(row) {
      return (
        <tr>
          {dataColumns.map(function(column) {
            //return <td>{row[column]}</td>; })}
            return <td>"1234"</td>; })}
        </tr>); });
    // Decorate with Bootstrap CSS
    return (<table className="table table-bordered table-hover" width="100%">
        {tableHeaders}
        {tableBody}
      </table>) ;
  }
}
