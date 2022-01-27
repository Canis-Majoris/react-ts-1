import React, { useReducer } from "react";
import { getBase64 } from "@Tools/utils";
import message from "@Tools/message";
import {
  validImageFileSizes,
  validImageFileTypes,
} from "@Constants/values/files";
import Icon from "@Components/UI/atoms/Icon";
import Upload, { UploadProps } from "@Components/UI/molecules/Upload";
import Modal from "@Components/UI/molecules/Modal";
import { ValidImageFileSizesTypes } from "@Types/shared-types";
import { UploadFile } from "antd/lib/upload/interface";

interface Props extends UploadProps {
  title: string;
  maxItemCount: number;
  validTypes: Array<string>;
  validSize: ValidImageFileSizesTypes
  onChange: (fileList: any | []) => void;
}

interface State {
  previewVisible: boolean;
  previewImage: string;
  previewTitle: string,
  fileList: Array<UploadFile> | [],
}

type UpdateState = Partial<State>;

const ImageUpload = ({
  fileList,
  title = "Upload",
  maxItemCount = 1,
  validTypes = validImageFileTypes,
  validSize = validImageFileSizes.md,
  onChange,
  ...rest
}: Props) => {
  const [state, setState] = useReducer(
    (oldState: State, newState: UpdateState): State => ({ ...oldState, ...newState }),
    {
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: fileList || [],
    }
  );

  const handleCancel = () => setState({ previewVisible: false });

  const handlePreview = async (file: UploadFile | undefined) => {
    setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const validateFile = (file: UploadFile | undefined) => {
    const isCorrectType = validTypes.includes(file.type);
    if (!isCorrectType) {
      message.error("Incorrect image type");
    }
    const isCorrectsize = file.size <= validSize.size;
    if (!isCorrectsize) {
      message.error(`Image must be smaller than ${validSize.name}!`);
    }
    const res = isCorrectType && isCorrectsize;
    return res;
  };

  const handleChange = async ({ fileList }: {fileList: Array<UploadFile> | []}) => {
    let valid = true;
    for (let file of fileList) {
      if (!validateFile(file)) {
        valid = false;
        break;
      }
    }
    valid && setState({ fileList });
    onChange && onChange(fileList);
  };

  const uploadButton = (
    <div>
      <Icon name='attach-1' />
      <div style={{ marginTop: 8 }}>{title}</div>
    </div>
  );

  return (
    <>
      <Upload
        listType='picture-card'
        fileList={state.fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        {...rest}
      >
        {state.fileList.length >= maxItemCount ? null : uploadButton}
      </Upload>
      <Modal
        visible={state.previewVisible}
        title={state.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt={state.previewTitle}
          style={{ width: "100%" }}
          src={state.previewImage}
        />
      </Modal>
    </>
  );
};

export default ImageUpload;
