import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const DropZone = (props) => {
  const { values, setFieldValue } = props;
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFieldValue(
        "files",
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  useEffect(
    () => () => {
      values.files &&
        values.files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [values.files],
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Kéo thả vào đây file hoặc bấm vào đây để chọn file</p>
        <span>(Lưu ý: ảnh đầu tiên sẻ là ảnh đại diện của sản phẩm)</span>
      </div>
      <aside style={thumbsContainer}>
        {values.files &&
          values.files.map((file) => (
            <div style={thumb} key={file.name}>
              <div style={thumbInner}>
                <img src={file.preview} alt={file.path} style={img} />
              </div>
            </div>
          ))}
      </aside>
    </section>
  );
};

export default DropZone;
