class Storage {
    constructor(){
        this.colorList = [];
        

        this.eventTrigger();
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