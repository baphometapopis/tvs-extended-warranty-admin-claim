import React from 'react';
import { Modal } from 'antd';

const ImageModal = ({ isOpen, onRequestClose, imageUrl, width = 800, height = 600 }) => {
    // Check the file extension
    const fileExtension = imageUrl.split('.').pop().toLowerCase();
    const isPDF = fileExtension === 'pdf';
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'].includes(fileExtension);

    return (
        <Modal
            visible={isOpen}
            onCancel={onRequestClose}
            footer={null}
            title="Preview"
            width={width}
            bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: `${height}px` }}
        >
            {isPDF ? (
                <iframe
                    src={imageUrl}
                    title={imageUrl}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                />
            ) : isImage ? (
                <img
                    src={imageUrl}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
            ) : (
                <div>Unsupported file type</div>
            )}
        </Modal>
    );
};

export default ImageModal;
