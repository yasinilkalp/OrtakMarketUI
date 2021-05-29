import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  Tooltip,
  Button,
  Popconfirm,
  message,
  Row,
  Col,
} from "antd";
import {
  SaveOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import EditableCell from "components/table-components/EditableCell";
import AddNewDocumentForm from "../documents/documentForm";
var originData = [
  {
    id: 1,
    name: "Sözleşme 001",
    isPharmacy: true,
  },
  {
    id: 2,
    name: "Sözleşme 002",
    isPharmacy: true,
  },
  {
    id: 3,
    name: "Sözleşme 003",
    isPharmacy: false,
  },
];

const DocumentBox = ({
  dataSource,
  save,
  edit,
  cancel,
  remove,
  editingKey,
  form,
}) => {
  const isEditing = (record) => record.id === editingKey;

  const columns = [
    {
      title: "Döküman Adı",
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
                onClick={() => save(record.id)}
                size="small"
                icon={<SaveOutlined />}
              />
            </Tooltip>

            <Tooltip title="Vazgeç">
              <Button
                type="danger"
                className="mr-2"
                onClick={() => cancel(record.id)}
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
              onConfirm={() => remove(record.id)}
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

  return (
    <Form form={form} component={false}>
      <Table
        components={components}
        bordered
        dataSource={dataSource}
        columns={mergedColumns}
        rowClassName="editable-row"
        rowKey="id"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

const Documents = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [IsOpenModal, setIsOpenModal] = useState(false);
  const [IsPharmacy, setIsPharmacy] = useState(false);

  useEffect(() => {
    setData(originData);
  }, []);

  const getdata = (isPharmacy) => {
    return data.filter((x) => x.isPharmacy == isPharmacy);
  };

  const edit = (record) => {
    if (editingKey) return;

    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const remove = (key) => {
    const list = [...data];
    setData(list.filter((item) => item.id !== key));
    setEditingKey("");
    message.success("Kayıt başarıyla silinmiştir.");
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);

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

  const modalState = async (value, isPharmacy) => {
    setIsOpenModal(value);
    setIsPharmacy(isPharmacy);
  };

  const createDocument = (values) => {
    var newData = {
      name: values.name,
      id: data.length + 1,
      isPharmacy: values.isPharmacy,
    };

    console.log(newData);

    setData((data) => [...data, newData]);
    setEditingKey("");
    setIsOpenModal(false);
    message.success("Kayıt başarıyla oluşturulmuştur.");
  };

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <Row>
            <Col span={20}>
              <h2 className="mb-4"> Genel Dökümanlar </h2>
            </Col>
            <Col span={4}>
              <Button
                type="link"
                size="middle"
                onClick={() => modalState(true, true)}
              >
                <PlusCircleOutlined />
              </Button>
            </Col>
          </Row>
          <DocumentBox
            dataSource={getdata(true)}
            remove={remove}
            edit={edit}
            save={save}
            cancel={cancel}
            editingKey={editingKey}
            form={form}
          />
        </Col>
        <Col className="gutter-row" span={12}>
          <Row>
            <Col span={20}>
              <h2 className="mb-4"> Eczane Özel Dökümanlar </h2>
            </Col>
            <Col span={4}>
              <Button
                type="link"
                size="middle"
                onClick={() => modalState(true, false)}
              >
                <PlusCircleOutlined />
              </Button>
            </Col>
          </Row>
          <DocumentBox
            dataSource={getdata(false)}
            remove={remove}
            edit={edit}
            save={save}
            cancel={cancel}
            editingKey={editingKey}
            form={form}
          />
        </Col>
      </Row>
      <AddNewDocumentForm
        visible={IsOpenModal}
        isPharmacy={IsPharmacy}
        onCreate={createDocument}
        onCancel={() => modalState(false)}
      />
    </>
  );
};

export default Documents;
