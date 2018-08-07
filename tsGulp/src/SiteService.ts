/// <reference path="jquery.d.ts"/>
/// <reference path="kendo.all.d.ts"/>

import {RfSoft} from "./RfSoft.MapleTr.DPS.Site";

class SiteService {
    site: RfSoft.MapleTr.DPS.Site;
    siteTree: kendo.ui.TreeView;

    constructor(){
        this.site = new RfSoft.MapleTr.DPS.Site();
    }

    Init(treeContainerId: string) {
        this.InitTree(treeContainerId);
        this.site.initContentPage();
    }

    /**
     * @description 初始化站点树
     * @param {string} containerId
     * @constructor
     */
    InitTree(containerId: string) {
        let data = [
            {
                ID: "0",
                Name: "站点根节点",
                ChildSites:
                    [
                        {
                            ID: "DS15173284238440506000599",
                            Name: "MapleTR_SH",
                        },
                        {
                            ID: "DS15173283930908504000429",
                            Name: "MapleTR_主门户",
                        },
                        {
                            ID: "DS15173284135948506000514",
                            Name: "MapleTR_GD",
                        },
                        {
                            ID: "DS15036562005792937000001",
                            Name: "MapleTR_ZZL",
                        },
                        {
                            ID: "DS1307300604140001",
                            Name: "站点主页",
                        }
                    ]
            }
        ];
        //构建流程分类树
        let dataSource = new kendo.data.HierarchicalDataSource({
            data: data,
            schema: {
                model: {
                    id: "ID",
                    children: "ChildSites",
                    expanded: true
                }
            }
        });
        let siteService = this;
        this.siteTree = new kendo.ui.TreeView($("#" + containerId)[0], {
            checkboxes: false,
            dataSource: dataSource,
            dataTextField: "Name",
           /* select(e) {//选中时根据id加载站点详情
                alert(e.node.id);
                e.node.id;
                siteService.site.bindSite(e.node.id, false);
            },*/
        });
    };


    /**
     * @description 添加站点
     * @constructor
     */
    AddSite() {
        this.site.bindSite("0", true)
    }

    /**
     * @description 删除站点
     * @constructor
     */
    DeleteSite() {
        //获取树的选中节点
        let node = this.siteTree.select();
        let id = "";
        if (node.length == 0) {
            alert("没有选择任何站点");
            return;
        }
        else {
            id = this.siteTree.dataItem(node).id;
        }
        if (confirm("确定要删除吗？")) {
            //执行删除
            let result = this.site.deleteSite(id);
            if (result) {
                alert("删除成功");
                //刷新树
                this.siteTree.dataSource.read();
            } else {
                alert("删除失败")
            }
        }
    }
}

export default class SiteManage {
    Init(): void {
        let site = new SiteService();
        site.Init("divInitTree");
    }
}
$(document).ready(function(){
    let rs = new SiteManage();
    rs.Init();
});
