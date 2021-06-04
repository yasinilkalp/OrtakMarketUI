import React, { useEffect, useRef } from "react";
import { Drawer, Button, Form, Row, Col, InputNumber, Input } from "antd";

const CategoryDrawer = (props) => {
  const [form] = Form.useForm();
  const formRef = useRef(null);
  const model = props.model;
  const item = model?.item;
  let action = model?.action;

  let title =
    action == "edit" ? (
      <span>
        <b>{item.title}</b> Kategorisini Düzenle
      </span>
    ) : item ? (
      <span>
        <b>{item.title}</b> Kategorisine Alt Kategori Ekle
      </span>
    ) : (
      <span> Yeni Kategori Ekle </span>
    );

  useEffect(() => {
    if (formRef.current) {
      if (model?.action == "edit") {
        form.setFieldsValue({
          key: item.key,
          level: item.level,
          title: item.title,
          commissionRate: item.commissionRate,
          termDay: item.termDay,
          children: item.children,
          action: model,
        });
      } else {
        form.setFieldsValue({
          key: 0,
          level: (item?.level ?? 0) + 1,
          title: "",
          commissionRate: "",
          termDay: "",
          children: [],
          action: model,
        });
      }
    }
  }, [formRef, form, model, item]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={props.onClose}
      visible={model?.state ?? false}
      title={title}
    >
      <Form
        layout="vertical"
        form={form}
        ref={formRef}
        onFinish={props.onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={16}>
          <Form.Item name="key">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="level">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="children">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="action">
            <Input type="hidden" />
          </Form.Item>
          <Col span={24}>
            <Form.Item
              name="title"
              label="Kategori Adı"
              rules={[{ required: true, message: "Lütfen boş bırakmayınız" }]}
            >
              <Input placeholder="Kategori adı yazınız" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="commissionRate"
              label="Komisyon Oranı"
              rules={[{ required: true, message: "Lütfen boş bırakmayınız" }]}
            >
              <InputNumber min={1} max={100} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="termDay"
              label="Vade"
              rules={[{ required: true, message: "Lütfen boş bırakmayınız" }]}
            >
              <InputNumber min={1} max={100} />
            </Form.Item>
          </Col>
        </Row>

        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button
            onClick={props.onClose}
            size="middle"
            style={{ marginRight: 8 }}
          >
            Vazgeç
          </Button>
          <Button htmlType="submit" size="middle" type="primary">
            Kaydet
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default CategoryDrawer;
