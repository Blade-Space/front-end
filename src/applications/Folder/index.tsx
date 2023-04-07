import React, { useEffect, useState } from "react";

import styles from "./index.module.css";

import {
  BaseLayout,
  ExtraModal,
  FolderNavigation,
  Text,
  FileListItem,
  Path
} from "server-os-uikit";

const Folder: React.FC = () => {
  // onClose=undefined, 
  // onHide=undefined,
  // title,
  // scaling=false,
  // draggable,
  // openPosition,
  // biggestValueOfTheLayer,

  const onClose = () => {}
  const onHide = () => {}
  const openPosition = () => {

  }

  const title = "Title"

  const path = "home/string";
  const files = [] as any[];

  const [isListView, setIsListView] = useState(true);
  const [isChooseFilter, setIsChooseFilter] = useState(false);

  const [filterType, setFilterType] = useState<"None" | "Name" | "Kind" | "Date" | "Size" | "Extation">("None");
  const [sortedData, setSortedData] = useState([...files]);
  const [filteredData, setFilterData] = useState([...files]);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue === "") {
      setFilterData([...sortedData]);
    } else {
      setFilterData(
        [...sortedData].filter((i) =>
          i.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [sortedData, searchValue, files]);

  useEffect(() => {
    switch (filterType) {
      case "Name":
        setSortedData((prev) =>
          [...sortedData].sort((a, b) => a.name.localeCompare(b.name))
        );
        break;
      case "Kind":
        setSortedData((prev) =>
          [...sortedData].sort((a, b) => a.type.localeCompare(b.type))
        );
        break;
      case "Size":
        setSortedData((prev) =>
          [...sortedData].sort((a, b) => {
            if (a.size < b.size) {
              return -1;
            }
            if (a.size > b.size) {
              return 1;
            }
            return 0;
          })
        );
        break;
      case "Date":
        setSortedData((prev) =>
          [...sortedData].sort((a, b) => {
            if (Date.parse(a.date) < Date.parse(b.date)) {
              return -1;
            }
            if (Date.parse(a.date) > Date.parse(b.date)) {
              return 1;
            }
            return 0;
          })
        );
        break;
      case "Extation":
        setSortedData((prev) =>
          [...sortedData].sort((a, b) => {
            if (a.name.includes(".") && b.name.includes(".")) {
              if (
                a.name.split(".")[a.name.split(".").length - 1] <
                b.name.split(".")[a.name.split(".").length - 1]
              ) {
                return -1;
              }
              if (
                a.name.split(".")[a.name.split(".").length - 1] >
                b.name.split(".")[a.name.split(".").length - 1]
              ) {
                return 1;
              }
              return 0;
            } else if (a.name.includes(".") && !b.name.includes(".")) {
              return 1;
            } else if (b.name.includes(".") && !a.name.includes(".")) {
              return -1;
            } else {
              return a.name.localeCompare(b.name);
            }
          })
        );
        break;
      case "None":
        setSortedData(files);
        break;
      default:
        setSortedData(files);
        break;
    }
  }, [files, filterType, sortedData]);

  const [value, setValue] = useState(0)

  return (
    <BaseLayout
      biggestValueOfTheLayer={{
        value: value,
        setValue: setValue
      }}
      scaling={true}
      draggable={true}
      onClose={onClose}
      onHide={onHide}
      openPosition={{
        y: 130,
        x: 160
      }}
      size={{
        height: "450px",
        width: "765px",
      }}
      title={title}
    >
      <div className={styles.folder}>
        <div style={{ position: "relative", boxSizing: "border-box" }}>
          <FolderNavigation
            search={{
              value: searchValue,
              onChange: setSearchValue,
            }}
            onFilter={() => setIsChooseFilter(!isChooseFilter)}
            isChooseFilter={isChooseFilter}
            changeView={() => {
              setIsListView((prev) => !prev);
            }}
            isListView={isListView}
            folder="Desktop"
            onBack={() => {
              alert("onBack");
            }}
            onForward={() => {
              alert("onForward");
            }}
            className={styles.folder__navigation}
            extraModal={
              <ExtraModal
                className={styles.folder__filter}
                width={130}
                items={[
                  { type: "item", options: { children: "None", onClick: () => { setFilterType("None") }}},
                  { type: "line" },
                  { type: "item", options: { children: "Name", onClick: () => {setFilterType("Name")}} },
                  { type: "item", options: { children: "Kind", onClick: () => { setFilterType("Kind") }}},
                  { type: "item", options: { children: "Date", onClick: () => { setFilterType("Date") }}},
                  { type: "item", options: { children: "Size", onClick: () => { setFilterType("Size") }}},
                  { type: "item", options: { children: "Extation", onClick: () => { setFilterType("Extation") }}},
                ]}
              />
            }
          />
        </div>
        <div className={styles.folder__table_titles}>
          <div className={styles.folder__file_name}>
            <Text size="medium 15px" color="gray">
              name
            </Text>
            <div className={styles.folder__small_line} />
          </div>
          <div className={styles.folder__file_data}>
            <Text size="medium 15px" color="gray">
              Dates
            </Text>
            <div className={styles.folder__small_line} />
          </div>
          <div className={styles.folder__file_type}>
            <Text size="medium 15px" color="gray">
              Type
            </Text>
            <div className={styles.folder__small_line} />
          </div>
          <div className={styles.folder__file_size}>
            <Text size="medium 15px" color="gray">
              Size
            </Text>
          </div>
        </div>
        <div className={styles.folder__files}>
          {filteredData.map((item, index) => (
            <FileListItem
              onOpen={item.onOpen}
              key={index}
              name={item.name}
              date={item.date}
              type={item.type}
              size={item.size}
              backgroundColor={index % 2 === 1 ? true : false}
            />
          ))}
        </div>
        <div className={styles.folder__path}>
          <Path path={path} type="folder" />
        </div>
      </div>
    </BaseLayout>
  );
};

export default Folder;
