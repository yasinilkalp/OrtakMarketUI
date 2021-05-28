import { 
    Input, 
    Form, 
    Modal,
  } from "antd";

const AddNewBankForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Yeni Kayıt Oluştur"
      okText="Kaydet"
      cancelText="Vazgeç"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
            form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Banka Adı"
          rules={[
            {
              required: true,
              message: "Boş Bırakmayınız.",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewBankForm;
