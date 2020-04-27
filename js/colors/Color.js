class Color {
    static checkBrightness(hex){
        if(hex.indexOf("#") >= 0) hex = hex.substr(1);
        const red = parseInt(hex.substr(0, 2), 16);
        const green = parseInt(hex.substr(2, 2), 16);
        const blue = parseInt(hex.substr(4, 2), 16);

        const light = "dark";
        const dark = "light";

        // 모두 크기가 같은 경우
        if(red === green && green === blue){
            if(red < 128) return dark;
            else return light;
        }
        // 빨강이 가장 큰 경우
        else if(red >= blue && red >= green){
            if(red < 128) return dark;
            else return light;
        }
        // 초록이 가장 큰 경우
        else if(green >= blue && green >= red){
            if(green < 128) return dark;
            else return light;
        }
        // 파랑이 가장 큰 경우
        else if(blue >= green && blue >= red){
            if(blue < 128) return dark;
            else return light;
        }
    }

    static getMainColor(hex){
        if(hex.indexOf("#") >= 0) hex = hex.substr(1);
        const red = parseInt(hex.substr(0, 2), 16);
        const green = parseInt(hex.substr(2, 2), 16);
        const blue = parseInt(hex.substr(4, 2), 16);
        
        let color = "none"; // 판정된 HEX 색상의 색상!

        // 무채색
        if(red === blue && blue === green) color = "gray"
        // 빨강이 가장 큰 경우
        else if(red >= green && red >= blue){
            if(green === blue) color = "red";
            else if(red === blue) color = "yellow";
            else if(red === green) color = "magenta";
            else if(green > blue){
                if((red - blue) / 2 >= green - blue) color = "red";
                else color = "yellow";
            } 
            else {
                if((red - green) / 2 >= blue - green) color = "red";
                else color = "magenta";
            }
        }
        // 초록이 가장 큰 경우
        else if(green > blue && green > red){
            if(blue === red) color = "green";
            else if(green === red) color = "yellow";
            else if(green === blue) color = "cyan";
            else if(blue > red){
                if((green - red) / 2 >= blue - red) color = "green";
                else color = "cyan";
            } 
            else {
                if((green - blue) / 2 >= red - blue) color = "green";
                else color = "yellow";
            }
        }
        // 파랑이 가장 큰 경우
        else if(blue > green && blue > red){
            if(green === red) color = "blue";
            else if(blue === red) color = "magenta";
            else if(blue === green) color = "cyan";
            else if(green > red){
                if((blue - red) / 2 >= green - red) color = "blue";
                else color = "cyan";
            } 
            else {
                if((blue - green) / 2 >= red - green) color = "blue";
                else color = "magenta";
            }
        }

        return color;
    } 
}