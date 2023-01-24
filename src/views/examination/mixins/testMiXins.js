import { GradeDictControl } from "@/api";
export default {
    data() {
        return {
            questionTaskList: [], //试卷种类
            questionGradeList: [], //所属年级
            questionSourceList: [], //考题来源
            questionTypeList: [] //考题类型
        };
    },
    methods: {
        /**
         * type 1:试卷种类 2:所属年级 3:考题来源 4:考题类型
         * **/
        getTreeData(type) {
            this.isLoading = true;
            GradeDictControl.listAll({ type: type }).then(res => {
                if (type == 1) {
                    this.questionTaskList = res.list || [];
                } else if (type == 2) {
                    this.questionGradeList = res.list || [];
                } else if (type == 3) {
                    this.questionSourceList = res.list || [];
                } else if (type == 4) {
                    this.questionTypeList = res.list || [];
                }
            });
        },
        initTest() {
            this.getTreeData(1);
            this.getTreeData(2);
            this.getTreeData(3);
            this.getTreeData(4);
        },

        /**
         * 试卷种类
         * **/
        dictTaskChange(value, selectedOptions) {
            this.form.dictTaskName = [];
            if (null != selectedOptions && selectedOptions.length > 0) {
                selectedOptions.map(item => {
                    this.form.dictTaskName.push(item.dictName);
                });
            }
        },
        /**
         * 所属年级
         * **/
        dictGradeChange(value, selectedOptions) {
            this.form.dictGradeName = [];
            if (null != selectedOptions && selectedOptions.length > 0) {
                selectedOptions.map(item => {
                    this.form.dictGradeName.push(item.dictName);
                });
            }
        },
        /**
         * 题目来源
         * **/
        dictSourceChange(value, selectedOptions) {
            this.form.dictSourceName = [];
            if (null != selectedOptions && selectedOptions.length > 0) {
                selectedOptions.map(item => {
                    this.form.dictSourceName.push(item.dictName);
                });
            }
        },
        /**
         * 所属类型
         * **/
        dictTypeChange(value, selectedOptions) {
            this.form.dictTypeName = [];
            if (null != selectedOptions && selectedOptions.length > 0) {
                selectedOptions.map(item => {
                    this.form.dictTypeName.push(item.dictName);
                });
            }
        }
    }
};
