import { useEffect, useRef, useState } from "react";
import Compressor from "compressorjs";
import { getImageURL, uploadImage } from "./firebase";

function App() {
  const [files, setFiles] = useState(new Array<File>());
  const [imgURL, setImgURL] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getImageURL("9.jfif").then((url) => {
      setImgURL(url);
    });
  }, [imgURL]);

  const uploadFiles = (file: File[]) => setFiles([...files, ...file]);

  const removeFile = (index: number) =>
    setFiles(files.filter((_, id) => id !== index));

  const clearFiles = () => setFiles([]);

  const submitFiles = () => {
    if (files.length === 0) return alert("파일이 없습니다.");
    new Compressor(files[0], {
      quality: 0.8,
      success: (result) => {
        uploadImage(files[0].name, result as File)
          .then((res) => {
            alert("업로드 성공했습니다.");
            clearFiles();
          })
          .catch((err) => alert(err));
      },
    });
  };

  return (
    <div className="app">
      <div className="app__inner">
        <div className="app__upload">
          <input
            className="app__input"
            ref={inputRef}
            type="file"
            onChange={(e) => {
              const files = e.currentTarget.files;
              if (!files) return alert("파일이 없습니다.");
              uploadFiles(Array.from(files));
              if (inputRef.current) inputRef.current.value = "";
            }}
          />
          <button
            className="app__btn"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              submitFiles();
            }}
          >
            Submit
          </button>
        </div>
        <div className="file__list">
          {files
            ? files.map((file, index) => (
                <div className="file__item" key={index}>
                  <div className="file__name">{file.name}</div>
                  <button
                    className="file__remove-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      removeFile(index);
                    }}
                  >
                    X
                  </button>
                </div>
              ))
            : null}
        </div>
        <img className="app__img" src={imgURL} alt="" />
      </div>
    </div>
  );
}

export default App;
