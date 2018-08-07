/// <reference path="jquery.d.ts"/>
/**
 * @description 站点信息类
 */
class SiteInfo {
    IsAnonymous: boolean;
    IsDefault: boolean;//是否是默认站点
    ID: string;//站点id
    DisplayName: string;//站点显示名
    Name: string;//站点名称
    SiteAdmin: string;//站点管理员
    IconURL: string = "/Themes/Image/icons/undifined/site_home.png";//站点图标
    ParentSiteId: string;//父级站点id
    IsSysSite: boolean;//是否是系统站点
    Sitetype: number;//站点类型
    IsDisplay: boolean;//是否显示
    URL: string;//站点链接
    Theme: string;//主题
    HeaderImage: string;//头部图片
    IsStartUpSiteOrg: string;//是否开启部门过滤
    SiteOrgID: string;//站点部门id
    SiteOrgName: string;//站点部门名称
    IsStartUpSiteDB: string;//是否开启业务数据分库管理
    DBName: string;//数据库名
    DBPwd: string;//数据库密码
    DBServiceName: string;//数据库服务名
    constructor(IsAnonymous?: boolean,
                IsDefault?: boolean,
                ID?: string,
                DisplayName?: string,
                Name?: string,
                SiteAdmin?: string,
                IconURL?: string,
                ParentSiteId?: string,
                IsSysSite?: boolean,
                Sitetype?: number,
                IsDisplay?: boolean,
                URL?: string,
                Theme?: string,
                HeaderImage?: string,
                IsStartUpSiteOrg?: string,
                SiteOrgID?: string,
                SiteOrgName?: string,
                IsStartUpSiteDB?: string,
                DBName?: string,
                DBPwd?: string,
                DBServiceName?: string) {
        this.DBName = DBName ? DBName : "";
        this.DBPwd = DBPwd ? DBPwd : "";
        this.DBServiceName = DBServiceName ? DBServiceName : "";
        this.DisplayName = DisplayName ? DisplayName : "";
        this.HeaderImage = HeaderImage ? HeaderImage : "";
        this.IconURL = IconURL ? IconURL : "";
        this.ID = ID ? ID : "";
        this.IsAnonymous = IsAnonymous ? IsAnonymous : false;
        this.IsDisplay = IsDisplay ? IsDisplay : false;
        this.IsDefault = IsDefault ? IsDefault : false;
        this.IsStartUpSiteOrg = IsStartUpSiteOrg ? IsStartUpSiteOrg : "false";
        this.IsStartUpSiteDB = IsStartUpSiteDB ? IsStartUpSiteDB : "false";
        this.IsSysSite = IsSysSite ? IsSysSite : false;
        this.Name = Name ? Name : "";
        this.ParentSiteId = ParentSiteId ? ParentSiteId : "";
        this.SiteAdmin = SiteAdmin ? SiteAdmin : "";
        this.SiteOrgID = SiteOrgID ? SiteOrgID : "";
        this.SiteOrgName = SiteOrgName ? SiteOrgName : "";
        this.Sitetype = Sitetype ? Sitetype : 0;
        this.Theme = Theme ? Theme : "";
        this.URL = URL ? URL : "";
    }
}

/**
 * 弹窗对象模型类
 */
class DialogObject {
    isMutilItems: boolean;
    type: string;
    isStartupSiteOrgFiltrate: boolean;
    NameControl: any;
    IdControl: any;
}
/**
 * @description 站点操作方法
 */
export namespace RfSoft.MapleTr.DPS {
    export class Site {

        testSite():void{
            document.body.innerText="from  RfSoft.MapleTr.DPS.Site";
            $('body').html("from  RfSoft.MapleTr.DPS.Site");
        }

        /**
         * @description 当前站点信息
         */
        currentSiteInfo: SiteInfo;
        /**
         * @description 是否是添加
         * @type {boolean}
         */
        addOption: boolean = true;
        /**
         * @description 站点管理时请求一般处理程序路径
         * @type {string}
         */
        SiteManagerHandler: string = "/Portal/RfSoft.MapleTr.DPS/Site/Control/SiteManagerHandler2.ashx";
        /**
         * @description 站点运行时请求的一般处理文件URL地址
         * @type {string}
         */
        SITE_RUNTIME_HANDLER: string = "/Portal/RfSoft.MapleTr.DPS/Site/Control/SiteRunTimeHandler2.ashx";

        /**
         * @description 初始化站点内容页
         */
        initContentPage() {
            //添加权限验证
            //TODO: true替换为方法验证
            //if (!RfSoft.MapleTr.DPS.Security.HasAuthorize("RfSoft.MapleTr.DPS.Site.Update")) {
            if (true) {
                $('#btnSave').css("display", "none");
            }
            //加载主题风格
            try {
                let themeXmlUrl = '/Portal/Config/SystemThemes.xml';
                this.loadOption(themeXmlUrl, "siteTheme");
            }
            catch (e) {
                alert("加载系统主题配置文件失败！原因：" + e.Message);
                return;
            }
            //加载页头图片
            try {
                let imageXmlUrl = '/Portal/Config/SystemHeadImage.xml';
                this.loadOption(imageXmlUrl, "headerimage");
            }
            catch (e) {
                alert("加载页头图片配置文件失败！原因：" + e.Message);
                return;
            }
            //$("#trOrganization")[top._isstartupsiteorg == "true" ? "show" : "hide"]();
            //$("#trDBLink")[top._isstartupsitedb == "true" ? "show" : "hide"]();
            $("#trOrganization")[(<any>window).top._isstartupsiteorg == "true" ? "show" : "hide"]();
            $("#trDBLink")[(<any>window).top._isstartupsitedb == "true" ? "show" : "hide"]();
        }

        /**
         * @description 加载option
         * @param xmlUrl
         * @param id
         */
        loadOption(xmlUrl: string, id: string) {
            let doc = new ActiveXObject("MSXML2.DOMDocument");//RfSoft.Common.CreateXMLDOM();
            //读取系统XML文件
            let handlerUrl: string = "/Portal/RfSoft.MapleTr.DPS/Site/Control/CommonRequestHandler2.ashx";
            let xml: string;
            $.ajax(<JQueryAjaxSettings>{
                url: handlerUrl,
                cache: false,
                async: true,
                type: "Get",
                data: {
                    action: "GETXML",
                    xmlUrl: xmlUrl
                },
                success: (data => {
                    xml = data.toString();
                    doc.loadXML(xml);
                    let $parent = $("#" + id).empty();
                    let nodes = doc.documentElement.childNodes;
                    $(nodes).each(function () {
                        if (this.nodeType === 1) {
                            let id = this.attributes[0].text;
                            let name = this.attributes[1].text;
                            let url = this.attributes[2].text;
                            $parent.append('<option value="' + id + '" url="' + url + '">' + name + '</option>');
                        }
                    });
                }),
                error: (jqXHR: JQueryXHR, status: string, message: string) => {
                    alert("获取系统xml出错,原因：" + message);
                }
            });
        }

        /**
         * @description 设置主题图片
         */
        setThemeImg(): void {
            let select = document.getElementById("siteTheme") as HTMLSelectElement;
            //TODO:获取option
            let options = select.selectedOptions;
            //20150909 zhoulin update 改成JQuery方式
            if (options != null) {
                $("#ThemeImg").attr({src: options[0].value, alt: options[0].value});
            }
        }

        /**
         * @description 设置头部图片
         */
        setHeaderImg(): void {
            let select = document.getElementById("headerimage") as HTMLSelectElement;
            //TODO:获取option
            let options = select.selectedOptions;
            //20150909 zhoulin update 改成JQuery方式
            //$("#ThemeImg").attr({ src: option.url, alt: $(option).text()});
            if (options != null) {
                $("#ThemeImg").attr({src: options[0].value, alt: options[0].value});
            }

        }

        /**
         * @description 初始化绑定站点信息
         * @param siteId
         * @param isAdd
         */
        bindSiteInfo(siteId: string, isAdd: boolean): void {
            if (siteId == "0") { //站点根节点直接只在站点信息
                this.bindSite(siteId, isAdd);
            }
            else {
                let result = this.checkSiteIsExsit(siteId); //根据站点ID验证站点是否存在
                if (result.toLowerCase() == "false") {
                    alert("站点不存在！");
                    //刷新树
                    let obj = window.parent.document;
                    obj.location.href = "/Portal/RfSoft.MapleTr.DPS/Site/html/SiteManage.htm";
                    return;
                }
                else if (result.toLowerCase() == "true") {
                    this.bindSite(siteId, isAdd);
                }
            }
        }

        /**
         * @description 绑定站点信息
         * @param siteId
         * @param isAdd
         */
        bindSite(siteId: string, isAdd: boolean): void {
            let authorize = false;
            if (isAdd)
            //TODO:获取授权
                authorize = true;//RfSoft.MapleTr.DPS.Security.HasAuthorize("RfSoft.MapleTr.DPS.Site.Add");
            else {
                //TODO:获取授权
                authorize = true;//RfSoft.MapleTr.DPS.Security.HasAuthorize("RfSoft.MapleTr.DPS.Site.Update");
            }
            $("#btnSave")[authorize ? "show" : "hide"]();
            this.addOption = isAdd;
            if (!isAdd) {
                let siteInfo = this.GetSiteById(siteId);
                this.currentSiteInfo = siteInfo;
            } else {
                this.currentSiteInfo = new SiteInfo();
            }
            this.initPageData();
        }

        /**
         * @description 检查站点信息是否存在
         * @param siteId
         * @return {string}
         */
        checkSiteIsExsit(siteId: string): string {
            let handlerUrl: string = "/Portal/RfSoft.MapleTr.DPS/Site/Control/CommonRequestHandler2.ashx";
            let result = "true";
            $.ajax(<JQueryAjaxSettings>{
                url: handlerUrl,
                cache: false,
                async: false,
                type: 'Get',
                data: {
                    action: "CHECKSITEISEXSIT",
                    siteId: siteId
                },
                success: (data => {
                    result = data.toString()
                }),
                error: (jqXHR: JQueryXHR, status: string, message: string) => {
                    alert("获取系统xml出错")
                }
            });
            return result;
        }

        /**
         *@description 初始化页面数据
         */
        initPageData() {
            $("#titleLab").text(this.addOption ? "新建站点" : "编辑站点");
            $("#siteDisplayName").val(this.currentSiteInfo.DisplayName);
            $("#siteName").attr({"disabled": !this.addOption, "value": this.currentSiteInfo.Name});
            $("#siteType").attr({"disabled": !this.addOption, "value": this.currentSiteInfo.Sitetype});
            $("#imageIconURL").attr({"src": this.currentSiteInfo.IconURL, "value": this.currentSiteInfo.IconURL});
            $("#siteURL").attr({"disabled": !this.addOption, "value": this.currentSiteInfo.URL});
            $("#sysSite").val(this.currentSiteInfo.IsSysSite ? "1" : "0");
            $("#defaultSite").val(this.currentSiteInfo.IsDefault ? "1" : "0");
            $("#siteTheme").val(this.currentSiteInfo.Theme);
            $("#headerimage").val(this.currentSiteInfo.HeaderImage);
            $("#siteDisplay").attr({
                "disabled": !this.currentSiteInfo.IsSysSite,
                "value": this.currentSiteInfo.IsDisplay ? "1" : "0"
            });
            let isVirtualSite: boolean = (this.currentSiteInfo.Sitetype === 0);
            $("#tr_url")[isVirtualSite ? "hide" : "show"]();
            //$("#trtheme")[isVirtualSite ? "show" : "hide"]();
            $("#trheaderimage")[isVirtualSite ? "show" : "hide"]();
            //setThemeImg();
            this.setHeaderImg();
            ($("#chb_org")[0] as HTMLInputElement).checked = this.currentSiteInfo.IsStartUpSiteOrg.toString().toLowerCase() == "true";
            this.changeSiteOrgPanelState($("#chb_org")[0] as HTMLInputElement);
            $("#txt_siteOrg").val(this.currentSiteInfo.SiteOrgName);
            $("#hid_siteOrg").val(this.currentSiteInfo.SiteOrgID);
            ($("#cjb_dblink")[0] as HTMLInputElement).checked = this.currentSiteInfo.IsStartUpSiteDB.toString().toLowerCase() == "true";
            this.changeDBLinkPanelState($("#cjb_dblink")[0] as HTMLInputElement);
            $("#DBName").val(this.currentSiteInfo.DBName);
            $("#DBPwd").val(this.currentSiteInfo.DBPwd);
            $("#DBServiceName").val(this.currentSiteInfo.DBServiceName);
            $("#validate_sitedisplayName").html("");
            $("#validate_sitename").html("");
            $("#validate_siteURL").html("");
        }

        /**
         * @description 切换选择
         * @param e
         */
        selectChange(e: HTMLSelectElement) {
            // 根据id判断他选中的是哪个
            switch (e.id) {
                case "siteTheme":
                    //20150909 zhoulin update 改成JQuery方式
                    this.helpdisplay("theme", $(e.options[e.selectedIndex]).text());
                    this.setThemeImg();
                    this.setHeaderImg();
                    break;
                case "headerimage":
                    this.helpdisplay("siteHead");
                    this.setHeaderImg();
                    break;
                case "sysSite":
                    this.helpdisplay(e.id + "_" + e.value);
                    $("#siteDisplay").attr({"disabled": e.value !== '1', "value": e.value});
                    break;
                case "siteType":
                    this.helpdisplay(e.id + "_" + e.value, "");
                    let isVirtualSite = (e.value === '0');
                    $("#tr_url")[isVirtualSite ? "hide" : "show"]();
                    // $("#trtheme")[isVirtualSite ? "show" : "hide"]();
                    $("#trheaderimage")[isVirtualSite ? "show" : "hide"]();
                    //if (top._isstartupsiteorg == "true")
                    if ((<any>window).top._isstartupsiteorg == "true")
                        $("#trOrganization")[isVirtualSite ? "show" : "hide"]();
                    //if (top._isstartupsitedb == "true")
                    if ((<any>window).top._isstartupsitedb == "true")
                        $("#trDBLink")[isVirtualSite ? "show" : "hide"]();
                    $('#siteURL').attr({"disabled": isVirtualSite, "value": ''});
                    this.setSiteUrl();
                    break;
                default:
                    this.helpdisplay(e.id + "_" + e.value);
                    break;
            }
        }

        /**
         * @description 设置站点url
         */
        setSiteUrl() {
            if ($("#siteType").val() === '0') {
                let enName = $("#siteName").val();
                //TODO:验证是否为空
                //if (!RfSoft.Common.Validate.IsNullOrEmpty(enName)) {
                if (true) {
                    $("#siteURL").val("~/" + enName + "/Default.aspx");
                }
            }
        }

        /**
         * @description 验证站点显示名
         * @returns {boolean}
         */
        checkDisplayName() {
            let obj = $('#siteDisplayName')[0] as HTMLInputElement;
            let tabId = "validate_sitedisplayName";
            //TODO:if (RfSoft.Common.Validate.IsNullOrEmpty(obj)) {
            if (obj == null || obj.value == "") {
                this.setErrorClass(tabId, "不可为空");
                return false;
            }
            //TODO:if (!RfSoft.Common.Validate.IsInLength(obj, 20)) {
            if (obj.value.length > 20) {
                this.setErrorClass(tabId, "长度不可超过20");
                return false;
            }
            //TODO:if (!RfSoft.Common.Validate.IsExp(obj, /^[\u4e00-\u9fa5\w\(\)\（\）]*$/)) {
            if (!(/^[\u4e00-\u9fa5\w\(\)\（\）]*$/.test(obj.value))) {
                this.setErrorClass(tabId, "只能有数字、字母、汉字、下划线和括号组成");
                return false;
            }
            document.getElementById(tabId).innerHTML = "";
            return true;
        }

        /**
         * @description 验证站点英文名称
         * @return {boolean}
         */
        checkEnName() {
            if (!this.addOption)
                return true;
            let obj = $('#siteName')[0] as HTMLInputElement;
            let tabId = "validate_sitename";
            //TODO:if (RfSoft.Common.Validate.IsNullOrEmpty(obj)) {
            if (obj == null || obj.value == "") {
                this.setErrorClass(tabId, "不可为空");
                return false;
            }
            //TODO:else if (!RfSoft.Common.Validate.IsInLength(obj, 20)) {
            else if (obj.value.length > 20) {
                this.setErrorClass(tabId, "长度不超过20");
                return false;
            }
            //TODO:else if (!RfSoft.Common.Validate.IsExp(obj, /^[a-zA-Z]\w{0,30}$/)) {
            else if (!(/^[a-zA-Z][a-zA-Z0-9]*$/.test(obj.value))) {
                this.setErrorClass(tabId, "只能是字母、数字、下划线且以字母开头");
                return false;
            }
            //else if (!RfSoft.Common.Validate.IsInLength(obj, 20)) {
            //    setErrorClass(tabId, "长度不超过20"); return false;
            //}
            let msg = this.checkEnNameExisted();
            if (msg) {
                this.setErrorClass(tabId, msg);
                return false;
            }
            document.getElementById(tabId).innerHTML = "";
            return true;
        }

        /**
         * @description 验证URL
         * @return {boolean}
         */
        checkURL() {
            if (!this.addOption)
                return true;
            let obj = $('#siteURL')[0] as HTMLInputElement;
            let tabId = "validate_siteURL";
            //TODO:if (RfSoft.Common.Validate.IsNullOrEmpty(obj)) {
            if (obj == null || obj.value == "") {
                this.setErrorClass(tabId, "不可为空");
                return false;
            }
            //TODO:if (!RfSoft.Common.Validate.IsInLength(obj, 200)) {
            if (obj.value.length > 200) {
                this.setErrorClass(tabId, "长度不超过200");
                return false;
            }
            /*TODO:if (!RfSoft.Common.Validate.IsURL(obj)) {

                setErrorClass(tabId, "URL格式不正确");
                return false;
            }*/
            document.getElementById(tabId).innerHTML = "";
            return true;
        }

        /**
         * @description 验证英文名称是否存在
         * @return {any}
         */
        checkEnNameExisted() {
            try {
                let resultStr = "";
                $.ajax(<JQueryAjaxSettings>{
                    url: this.SiteManagerHandler,
                    cache: false,
                    async: false,
                    type: 'Get',
                    data: {
                        action: "nameisused",
                        name: $("#siteName").val()
                    },
                    success: (data => {
                        resultStr = data.toString()
                    }),
                    error: (jqXHR: JQueryXHR, status: string, message: string) => {
                        alert("验证英文名出错")
                    }
                });

                let result = $.parseJSON(resultStr);
                if (result.result === true)
                    return "名称已被使用";
                return "";
            }
            catch (e) {
                return "连接到服务器失败";
            }
        }

        /**
         * @description 数据库链接检查
         * @param obj
         * @return {boolean}
         */
        checkDBLink(obj?: HTMLElement) {
            if (obj != null && obj != undefined) {
                if ($(obj).val())
                    $("#validate_" + obj.id).html("");
                else
                    $("#validate_" + obj.id).html("不可为空");
                return;
            }
            let dbLink = $("#cjb_dblink")[0] as HTMLInputElement;
            if (!dbLink.checked)
                return true;
            if (!$("#DBName").val()) {
                $("#validate_DBName").html("不可为空");
                return false;
            }
            if (!$("#DBPwd").val()) {
                $("#validate_DBPwd").html("不可为空");
                return false;
            }
            if (!$("#DBServiceName").val()) {
                $("#validate_DBServiceName").html("不可为空");
                return false;
            }
            return true;
        }

        /**
         * @description 错误信息提示
         * @param objstr
         * @param errortext
         */
        setErrorClass(objstr: string, errortext: string) {
            $('#' + objstr + '').addClass("validate_error").html(errortext);
        }

        /**
         * @description 显示帮助信息
         * @param obj
         * @param msg
         */
        helpdisplay(obj: string, msg?: string): void {
            let html = '';
            switch (obj) {
                case "siteType_0":
                    html = "内部虚拟:当前站点下面的虚拟站点，当设置为虚拟站点的时候，用户可以在不同的站点之间进行切换";
                    break;
                case "siteType_1":
                    html = "外部物理：不是同一个站点的URL,当两个系统同时存在的时候，单点登录启动之后，可以跨库操作，例如：百度等站点";
                    break;
                case "sysSite_0":
                    html = "是否是系统, 否：当前站点不在导航上显示";
                    break;
                case "sysSite_1":
                    html = "是否是系统, 是：当前站点在导航上显示";
                    break;
                case "siteDisplay_0":
                    html = "是否显示, 否：该系统在站点导航上不显示";
                    break;
                case "siteDisplay_1":
                    html = "是否显示为, 是：该系统会在站点导航上显示";
                    break;
                case "siteAnonymous_0":
                    html = "是否匿名访问, 是：用户不需要登录就可以访问该站点";
                    break;
                case "siteAnonymous_1":
                    html = "是否匿名访问, 否：用户必须登录才可以访问到该站点";
                    break;
                case "siteDefault_0":
                    html = "默认站点, 否：用户第一次登录不可以访问该站点";
                    break;
                case "siteDefault_1":
                    html = "默认站点, 是：用户第一次登录可以访问到该站点";
                    break;
                case "theme":
                    html = "主题风格：" + msg + "<br/>注：如果当前站点的主题或页头图片不生效，刷新页面后重试。";
                    break;
                case "siteHead":
                    html = "页头图片, 该站点页头使用页头图片右边显示的图片。<br/>注：如果当前站点的主题或页头图片不生效，刷新页面后重试。";
                    break;
                case "siteURL":
                    html = "进入站点URL：输入物理URL与内部虚拟URL 例如：http: //192.168.0.192:1010/ ";
                    break;
                default:
                    break;
            }
            $("#help").html(html);
        }

        /**
         * @description 保存站点
         */
        saveSite() {
            if (this.checkDisplayName() && this.checkEnName() && this.checkURL() && this.checkDBLink()) {
                this.GetSite();
                let jsonStr = this.convertToJsonStr(this.currentSiteInfo);
                let option = this.addOption ? 'add' : 'update';
                let result = "";
                try {
                    $.ajax(<JQueryAjaxSettings>{
                        url: this.SiteManagerHandler,
                        cache: false,
                        async: true,
                        type: 'Post',
                        data: {
                            action: option,
                            site: jsonStr
                        },
                        success: (data => {
                            result = data.toString();
                            if (result != "") {
                                let executeResult = $.parseJSON(result);
                                if (executeResult.result) {
                                    if (this.addOption) {
                                        this.currentSiteInfo.ID = executeResult.data;
                                    }
                                    (<any>window).parent.editCallback(this.currentSiteInfo, this.addOption);
                                    this.addOption = false;
                                    this.initPageData();
                                    alert("保存成功。");
                                } else {
                                    alert("保存失败。");
                                    if (option == "update") { //站点缓存并发操作处理，保存失败时重新加载树 2013-12-27 liudf
                                        let obj = window.parent.document;
                                        obj.location.href = "/Portal/RfSoft.MapleTr.DPS/Site/html/SiteManage.htm";
                                    }
                                }
                            }
                        }),
                        error: (jqXHR: JQueryXHR, status: string, message: string) => {
                            alert("更新站点失败，原因是：" + message)
                        }
                    });
                }
                catch (e) {
                    alert("连接到服务器失败");
                }
            }
        }

        /**
         * @description 删除站点
         * @param {string} siteId
         */
        deleteSite(siteId:string):boolean{
            let result="";
            try{
                $.ajax(<JQueryAjaxSettings>{
                    url: this.SiteManagerHandler,
                    cache: false,
                    async: true,
                    type: 'Post',
                    data: {
                        action: "delete",
                        siteId: siteId
                    },
                    success: (data => {
                        result = data.toString();
                        if (result != "") {
                            let executeResult = $.parseJSON(result);
                            if (executeResult.result) {
                                return true;
                            }else{
                                return false;
                            }
                        }
                    }),
                    error: (jqXHR: JQueryXHR, status: string, message: string) => {
                        alert("删除失败，原因是：" + message);
                        return false;
                    }
                });
            }catch(e){
                alert("连接到服务器失败");
                return false;
            }
        }

        /**
         * @description 获取页面中的值
         * @constructor
         */
        GetSite() {
            this.currentSiteInfo.IsDefault = $("#defaultSite").val() === '1';
            this.currentSiteInfo.DisplayName = $("#siteDisplayName").val();
            this.currentSiteInfo.Name = $("#siteName").val();
            this.currentSiteInfo.IconURL = $('#imageIconURL').val();
            this.currentSiteInfo.IsSysSite = $("#sysSite").val() === '1';
            this.currentSiteInfo.Sitetype = Number($("#siteType").val());
            this.currentSiteInfo.IsDisplay = $("#siteDisplay").val() === '1';
            this.currentSiteInfo.URL = $("#siteURL").val();
            this.currentSiteInfo.Theme = $("#siteTheme").val();
            this.currentSiteInfo.HeaderImage = $("#headerimage").val();
            this.currentSiteInfo.IsStartUpSiteOrg = ($("#chb_org")[0] as HTMLInputElement).checked ? "true" : "false";
            if (this.currentSiteInfo.IsStartUpSiteOrg == "true") {
                this.currentSiteInfo.SiteOrgName = $("#txt_siteOrg").val();
            }
            this.currentSiteInfo.SiteOrgID = $("#hid_siteOrg").val();
            this.currentSiteInfo.IsStartUpSiteDB = ($("#cjb_dblink")[0] as HTMLInputElement).checked ? "true" : "false";
            this.currentSiteInfo.DBName = $("#DBName").val();
            this.currentSiteInfo.DBPwd = $("#DBPwd").val();
            this.currentSiteInfo.DBServiceName = $("#DBServiceName").val();
        }

        /**
         * @description 转换为json
         * @param site
         * @return {string}
         */
        convertToJsonStr(site: SiteInfo) {
            let jsonStr = '{';
            jsonStr += '"ID":"' + site.ID + '"';
            jsonStr += ',"DisplayName":"' + site.DisplayName + '"';
            jsonStr += ',"Name":"' + site.Name + '"';
            jsonStr += ',"SiteAdmin":"' + site.SiteAdmin + '"';
            jsonStr += ',"IsDefault":"' + site.IsDefault + '"';
            jsonStr += ',"IconURL":"' + site.IconURL + '"';
            jsonStr += ',"ParentSiteId":"' + site.ParentSiteId + '"';
            jsonStr += ',"IsSysSite":"' + site.IsSysSite + '"';
            jsonStr += ',"Sitetype":"' + site.Sitetype + '"';
            jsonStr += ',"IsDisplay":"' + site.IsDisplay + '"';
            jsonStr += ',"URL":"' + site.URL + '"';
            jsonStr += ',"Theme":"' + site.Theme + '"';
            jsonStr += ',"HeaderImage":"' + site.HeaderImage + '"';
            jsonStr += ',"IsStartUpSiteOrg":"' + site.IsStartUpSiteOrg + '"';
            if (site.IsStartUpSiteOrg) { //如果启用了部门过滤，则将部门的信息更新到缓存中
                jsonStr += ',"SiteOrgName":"' + site.SiteOrgName + '"';
            }
            jsonStr += ',"SiteOrgID":"' + site.SiteOrgID + '"';
            jsonStr += ',"IsStartUpSiteDB":"' + site.IsStartUpSiteDB + '"';
            jsonStr += ',"DBName":"' + site.DBName + '"';
            jsonStr += ',"DBPwd":"' + site.DBPwd + '"';
            jsonStr += ',"DBServiceName":"' + site.DBServiceName + '"';
            jsonStr += '}';
            return jsonStr;
        }

        /**
         * @description 选择站点部门
         * @return {boolean}
         */
        selSiteOrg() {
            let obj = new DialogObject();
            obj.isMutilItems = true;
            obj.type = 'ORG';
            obj.isStartupSiteOrgFiltrate = false;
            obj.NameControl = $('<INPUT>').val($('#txt_siteOrg').val());
            obj.IdControl = $('<INPUT>').val($("#hid_siteOrg").val());
            let result = {operate: "", names: "", ids: ""}; //TODO:RfSoft.MapleTr.DPS.Hr.openDeptOrRoleDialog(obj);
            if (result.operate == 'EXIT') {
                return false;
            }
            $('#txt_siteOrg').val(result.names);
            $("#hid_siteOrg").val(result.ids);
        }

        /**
         * @description 是否启用部门过滤验证
         * @param obj
         */
        changeSiteOrgPanelState(obj: HTMLInputElement) {
            if (obj.checked) {
                $("#div_siteOrg").show();
            }
            else {
                $("#div_siteOrg").hide();
            }
            $("#txt_siteOrg").html('<span style="color:Gray;">如果为空，站点不启用部门过滤</span>');
        }

        /**
         * @description 是否使用数据库验证
         * @param obj
         */
        changeDBLinkPanelState(obj: HTMLInputElement) {
            if (obj.checked) {
                $("#div_dbLink").show();
            }
            else {
                $("#div_dbLink").hide();
            }
        }

        /**
         * @description 得到当前人员访问的站点
         * @param {boolean} noCache
         * @returns {any}
         * @constructor
         */
        CurrentSite(noCache: boolean) {
            let site: SiteInfo;
            if (noCache) {
                let returnValue = "";
                $.ajax(<JQueryAjaxSettings>{
                    url: this.SITE_RUNTIME_HANDLER,
                    cache: false,
                    async: false,
                    type: 'Get',
                    data: {
                        action: 'currentsite',
                        noCache: Math.random()
                    },
                    success: (data => {
                        returnValue = data.toString()
                    }),
                    error: (jqXHR: JQueryXHR, status: string, message: string) => {
                        alert("获取当前站点出错，原因是" + message)
                    }
                });
                try {
                    let result = $.parseJSON(returnValue);
                    if (result.result === true)
                        return <SiteInfo>result.site;
                    else
                        return null;
                }
                catch (e) {
                    return null;
                }
            }
            else {
                try {
                    //TODO: 获取全局top.g_Site
                    /*            if (top.g_Site) {
                                    site = top.g_Site;
                                }
                                else {
                                    site = CurrentSite(true);
                                }*/
                    site = this.CurrentSite(true);
                }
                catch (e) {
                    //跨域调用无权限 重新请求服务器
                    site = this.CurrentSite(true);
                }
            }
            return site;
        }

        /**
         * @description 获取系统默认站点
         * @returns {any}
         * @constructor
         */
        DefaultSite() {
            let sendXml = "<Execute option='getdefaultsite'/>";
            let returnValue = "";
            $.ajax(<JQueryAjaxSettings>{
                url: this.SITE_RUNTIME_HANDLER,
                cache: false,
                async: false,
                type: 'Get',
                data: {
                    action: 'getdefaultsite'
                },
                success: (data => {
                    returnValue = data.toString()
                }),
                error: (jqXHR: JQueryXHR, status: string, message: string) => {
                    alert("获取默认站点出错，原因：" + message);
                }
            });
            try {
                let result = $.parseJSON(returnValue);
                if (result.result !== true) {
                    //TODO: 跳转登录 RfSoft.MapleTr.DPS.Security.gotoLogin();
                    return null;
                }
                else {
                    return $.parseJSON(result.data);
                }
            }
            catch (e) {
                return null;
            }
        }

        /**
         * @description 根据站点id获取站点
         * @param {string} siteId
         * @returns {any}
         * @constructor
         */
        GetSiteById(siteId: string) {
            let returnValue = "";
            $.ajax(<JQueryAjaxSettings>{
                url: this.SITE_RUNTIME_HANDLER,
                cache: false,
                async: false,
                type: 'Get',
                data: {
                    action: 'getsitebyid',
                    siteId: siteId
                },
                success: (data => {
                    returnValue = data.toString()
                }),
                error: (jqXHR: JQueryXHR, status: string, message: string) => {
                    alert("根据id获取站点失败，原因是：" + message)
                }
            });
            try {
                let result = $.parseJSON(returnValue);
                if (result.result === true)
                    return $.parseJSON(result.data);
            }
            catch (e) {
                return null;
            }
        }

        /**
         * @description 根据人员id获取默认站点
         * @param {string} userId
         * @returns {any}
         * @constructor
         */
        GetDefaultSiteByUserId(userId: string) {
            let returnValue = "";
            $.ajax(<JQueryAjaxSettings>{
                url: this.SITE_RUNTIME_HANDLER,
                cache: false,
                async: false,
                type: 'Get',
                data: {
                    action: 'getuserdefaultsite',
                    userId: userId
                },
                success: (data => {
                    returnValue = data.toString()
                }),
                error: (jqXHR: JQueryXHR, status: string, message: string) => {
                    alert("获取用户默认站点失败，原因是：" + message)
                }
            });
            try {
                let result = $.parseJSON(returnValue);
                if (result.result === true)
                    return $.parseJSON(result.data);
            }
            catch (e) {
                return null;
            }
        }

        /**
         * @description 根据url获取站点id
         * @param {string} url
         * @returns {string}
         * @constructor
         */
        GetSiteIdByURL(url: string): string {
            let returnValue = "";
            $.ajax(<JQueryAjaxSettings>{
                url: this.SITE_RUNTIME_HANDLER,
                cache: false,
                async: false,
                type: 'Get',
                data: {
                    action: 'getsiteidbyurl',
                    siteUrl: url
                },
                success: (data => {
                    returnValue = data.toString()
                }),
                error: (jqXHR: JQueryXHR, status: string, message: string) => {
                    alert("获取站点id失败")
                }
            });
            try {
                let result = $.parseJSON(returnValue);
                if (result.result === true)
                    return $.parseJSON(result.data).siteId;
            }
            catch (e) {
                return "";
            }
        }

        /**
         * @description 根据userId获取人员有权限的站点集合
         * @param {string} userId
         * @returns {any}
         * @constructor
         */
        GetSitesByUser(userId: string) {
            let returnValue = "";
            $.ajax(<JQueryAjaxSettings>{
                url: this.SITE_RUNTIME_HANDLER,
                cache: false,
                async: false,
                type: 'Get',
                data: {
                    action: 'getsitesbyuser',
                    userId: userId
                },
                success: (data => {
                    returnValue = data.toString()
                }),
                error: (jqXHR: JQueryXHR, status: string, message: string) => {
                    alert("根据获取站点失败")
                }
            });
            try {
                let result = $.parseJSON(returnValue);
                if (result.result === true)
                    return $.parseJSON(result.data);
            }
            catch (e) {
                return null;
            }
        }

        /**
         * @description 获取不同的站点树集合
         * @param {string} objId
         * @param {string} type
         * @returns {any}
         * @constructor
         */
        GetSitesByType(objId: string, type: string): void {
            let returnValue = "";
            $.ajax(<JQueryAjaxSettings>{
                url: this.SITE_RUNTIME_HANDLER,
                cache: false,
                async: false,
                type: 'Get',
                data: {
                    action: 'getsitesbytype',
                    objId: objId,
                    type: type
                },
                success: (data => {
                    returnValue = data.toString()
                }),
                error: (jqXHR: JQueryXHR, status: string, message: string) => {
                    alert("根据获取站点失败")
                }
            });
            try {
                let result = $.parseJSON(returnValue);
                if (result.result === true)
                    return $.parseJSON(result.data);
            }
            catch (e) {
                return null;
            }
        }
    }
}





