


const District = ()=> {

    return (
        <Modal
          visible={visible}
          title="İlçeler"
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
           
        </Modal>
      );
}

export default District;