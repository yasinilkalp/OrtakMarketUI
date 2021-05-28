import React, { useState } from "react";
import {
  Table,
  Input, 
  Popconfirm,
  Form,
  Tooltip,
  Button,
  message,
  Row,
  Col,
} from "antd";
import originData from "assets/data/bankalar.json";
import {
  SaveOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AddNewBankForm from "./bankForm";
import EditableCell from "components/table-components/EditableCell";


const CitiesTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [IsOpenModal, setIsOpenModal] = useState(false);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.eft === editingKey;

  const edit = (record) => {
    if (editingKey) return;

    form.setFieldsValue({ ...record });
    setEditingKey(record.eft);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const remove = (key) => {
    const list = [...data];
    setData(list.filter((item) => item.eft !== key));
    setEditingKey("");
    message.success("Kayıt başarıyla silinmiştir.");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.eft);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }

      message.success("Kayıt başarıyla güncellenmiştir.");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const modalState = async (value) => {
    setIsOpenModal(value);
  };

  const filter = (e) => {
    setSearch(e.target.value);
  };

  const createBank = (values) => {
    var newData = {
      name: values.name,
      eft: data.length + 1,
    };

    console.log(newData);
    setData((data) => [...data, newData]);
    setEditingKey("");
    setIsOpenModal(false);
    message.success("Kayıt başarıyla oluşturulmuştur.");
  };

  const columns = [
    {
      title: "Banka Adı",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "İşlemler",
      width: "100px",
      dataIndex: "operation",
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <div className=" d-flex ">
            <Tooltip title="Kaydet">
              <Button
                type="primary"
                className="mr-2"
                onClick={() => save(record.eft)}
                size="small"
                icon={<SaveOutlined />}
              />
            </Tooltip>

            <Tooltip title="Vazgeç">
              <Button
                type="danger"
                className="mr-2"
                onClick={() => cancel(record.eft)}
                size="small"
                icon={<CloseOutlined />}
              />
            </Tooltip>
          </div>
        ) : (
          <div className="d-flex">
            <Tooltip title="Düzenle">
              <Button
                type="ghost"
                className="mr-2"
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
                size="small"
                icon={<EditOutlined />}
              />
            </Tooltip>

            <Popconfirm
              placement="left"
              okText="Evet"
              cancelText="Hayır"
              title="Emin misin?"
              disabled={editingKey !== ""}
              onConfirm={() => remove(record.eft)}
            >
              <Tooltip title="Sil">
                <Button
                  danger
                  disabled={editingKey !== ""}
                  size="small"
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  React.useEffect(() => {
    const results = originData
      .filter((person) => person.name.toLowerCase().includes(search))
      .sort((a, b) => {
        return a.name - b.name;
      });

    setData(results);

    if (search === "") {
      setEditingKey("");
    }
  }, [search]);

  return (
    <Form form={form} component={false}>
      <Row>
        <Col className="gutter-row" span={16}>
          <h2 className="mb-4"> Bankalar </h2>
        </Col>
        <Col className="gutter-row" span={5}>
          <Input onChange={filter} value={search} placeholder="Arama..." />
        </Col>
        <Col className="gutter-row ml-4" span={2}>
          <Button onClick={() => modalState(true)} type="primary">
            <PlusOutlined /> Yeni Ekle
          </Button>
        </Col>
      </Row>

      <Table
        components={components}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        rowKey="eft"
        pagination={{
          onChange: cancel,
        }}
        onChange={(pagination, filters, sorter, extra) => {
          console.log("ok");
        }}
      />

      <AddNewBankForm
        visible={IsOpenModal}
        onCreate={createBank}
        onCancel={() => modalState(false)}
      />
    </Form>
  );
};

const Banks = () => {
  return <CitiesTable />;
};

export default Banks;