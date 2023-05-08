import { View, Image, TouchableOpacity, Dimensions } from "react-native";
import { useState } from "react";

import { io } from "socket.io-client";
import { SOCKET_SERVER_URL } from "@env";
const socket = io.connect(SOCKET_SERVER_URL);

socket.on("connect", () => {
    console.log("connect");
    socket.emit("getThList");
});

socket.on("disconnect", () => console.log("disconnect"));

socket.on("thList", (list: string[]) => {
    list.forEach((img: string) => socket.emit("getTh", img));
});

socket.on("th", (mess: { bytes: string; name: string; ext: string }) => {
    setImagesList([
        ...imagesList,
        { uri: "data:image/jpeg;base64," + mess.bytes, name: mess.name, ext: mess.ext },
    ]);
});

let showImgBytes: string;
socket.on("img", (bytes: string) => {
    showImgBytes = "data:image/jpeg;base64," + bytes;
    changeShowImg(!showImg);
});

let imagesList: any, setImagesList: any, showImg: any, changeShowImg: any;
export default function App() {
    const win = Dimensions.get("window");

    [imagesList, setImagesList] = useState([]);

    [showImg, changeShowImg] = useState(false);
    const showImage = (name: string, ext: string) => {
        console.log(name);
        socket.emit("getImg", { name, ext });
    };

    return (
        <View style={{ flexDirection: "row", flexWrap: "wrap", height: 500 }}>
            {showImg == false ? (
                imagesList.map((image: any, index: number) => (
                    <TouchableOpacity onPress={() => showImage(image.name, image.ext)} key={index}>
                        <Image
                            style={{ width: 96, height: 96, margin: 1 }}
                            key={index}
                            source={{ uri: image.uri }}
                        />
                    </TouchableOpacity>
                ))
            ) : (
                <TouchableOpacity onPress={() => changeShowImg(!showImg)}>
                    <Image
                        style={{
                            height: win.height,
                            width: win.width,
                            margin: 1,
                        }}
                        resizeMode={"contain"}
                        source={{ uri: showImgBytes }}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}
