class Storage {
    constructor(){
        this.colorList = [];
        this.user_id = location.pathname.split("/").pop();
    
        this.loading().then(() => { // 색상 그룹, 색상 모두 불러오기 완료
            console.log(this.colorList);
        });

        this.eventTrigger();
    }

    async loading(){
        this.colorList = await this.loadGroupData();
        this.colorList.forEach(item => {
            this.loadColorData(item.id).then(colors => {
                item.data = colors;
            });
        });
    }

    loadGroupData(){
        return new Promise( res => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/users/"+ this.user_id +"/groups");
            xhr.send();
            xhr.onload = () => res(JSON.parse(xhr.responseText));
        })
    }

    loadColorData(group_id){
        return new Promise( res => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/groups/"+group_id+"/colors");
            xhr.send();
            xhr.onload = () => res(JSON.parse(xhr.responseText));
        });
    }

    eventTrigger(){
        document.querySelectorAll(".group-remove").forEach(button => {
            button.addEventListener("click", e => {
                let callback = function(){
                    alert("!");
                };
                Alert.confirm("<h3>정말 삭제하시겠습니까?</h3><small class='in-block mt-1'>그룹에 등록된 모든 색상이 삭제될 거에요!<br>신중하게 선택해 주세요!</small>", callback, "네, 삭제할게요.", "아니 잠깐만요!")
            });
        });
    }
}

window.addEventListener("load", () => {
    let storage = new Storage();
    storage.init();
});