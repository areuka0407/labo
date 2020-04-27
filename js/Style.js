class Style {
    /**
     * 문서 객체의 스타일을 정수로 가져오는 함수
     * @param {Object} elem 스타일을 가져올 문서 객체
     * @param {String} styleName 가져올 스타일의 이름
     */
    static getStyleByInteger(elem, styleName){
        return parseInt(getComputedStyle(elem).getPropertyValue(styleName));
    }

    /**
     * 문서 객체의 스타일을 실수로 가져오는 함수
     * @param {Object} elem 스타일을 가져올 문서 객체
     * @param {String} styleName 가져올 스타일의 이름
     */
    static getStyleByFloat(elem, styleName){
        return parseFloat(getComputedStyle(elem).getPropertyValue(styleName));
    }

    /**
     * 스타일을 객체를 통해 설정하는 함수
     * @param {Object} elem 스타일을 설정할 문서 객체
     * @param {Object} styles 설정할 스타일을 나열한 객체
     */
    static setStyle(elem, styles, value = null){
        if(typeof styles !== Object && value === null){
            Object.keys(styles).forEach(key => Reflect.set(elem.style, key, styles[key]));
        }
        else {
            Reflect.set(elem.style, styles, value);
        }
        
    }
}