(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="jquery.d.ts"/>
/**
 * @description 站点信息类
 */
var SiteInfo = /** @class */ (function () {
    function SiteInfo(IsAnonymous, IsDefault, ID, DisplayName, Name, SiteAdmin, IconURL, ParentSiteId, IsSysSite, Sitetype, IsDisplay, URL, Theme, HeaderImage, IsStartUpSiteOrg, SiteOrgID, SiteOrgName, IsStartUpSiteDB, DBName, DBPwd, DBServiceName) {
        this.IconURL = "/Themes/Image/icons/undifined/site_home.png"; //站点图标
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
    return SiteInfo;
}());
/**
 * 弹窗对象模型类
 */
var DialogObject = /** @class */ (function () {
    function DialogObject() {
    }
    return DialogObject;
}());
/**
 * @description 站点操作方法
 */
var RfSoft;
(function (RfSoft) {
    var MapleTr;
    (function (MapleTr) {
        var DPS;
        (function (DPS) {
            var Site = /** @class */ (function () {
                function Site() {
                    /**
                     * @description 是否是添加
                     * @type {boolean}
                     */
                    this.addOption = true;
                    /**
                     * @description 站点管理时请求一般处理程序路径
                     * @type {string}
                     */
                    this.SiteManagerHandler = "/Portal/RfSoft.MapleTr.DPS/Site/Control/SiteManagerHandler2.ashx";
                    /**
                     * @description 站点运行时请求的一般处理文件URL地址
                     * @type {string}
                     */
                    this.SITE_RUNTIME_HANDLER = "/Portal/RfSoft.MapleTr.DPS/Site/Control/SiteRunTimeHandler2.ashx";
                }
                Site.prototype.testSite = function () {
                    document.body.innerText = "from  RfSoft.MapleTr.DPS.Site";
                    $('body').html("from  RfSoft.MapleTr.DPS.Site");
                };
                /**
                 * @description 初始化站点内容页
                 */
                Site.prototype.initContentPage = function () {
                    //添加权限验证
                    //TODO: true替换为方法验证
                    //if (!RfSoft.MapleTr.DPS.Security.HasAuthorize("RfSoft.MapleTr.DPS.Site.Update")) {
                    if (true) {
                        $('#btnSave').css("display", "none");
                    }
                    //加载主题风格
                    try {
                        var themeXmlUrl = '/Portal/Config/SystemThemes.xml';
                        this.loadOption(themeXmlUrl, "siteTheme");
                    }
                    catch (e) {
                        alert("加载系统主题配置文件失败！原因：" + e.Message);
                        return;
                    }
                    //加载页头图片
                    try {
                        var imageXmlUrl = '/Portal/Config/SystemHeadImage.xml';
                        this.loadOption(imageXmlUrl, "headerimage");
                    }
                    catch (e) {
                        alert("加载页头图片配置文件失败！原因：" + e.Message);
                        return;
                    }
                    //$("#trOrganization")[top._isstartupsiteorg == "true" ? "show" : "hide"]();
                    //$("#trDBLink")[top._isstartupsitedb == "true" ? "show" : "hide"]();
                    $("#trOrganization")[window.top._isstartupsiteorg == "true" ? "show" : "hide"]();
                    $("#trDBLink")[window.top._isstartupsitedb == "true" ? "show" : "hide"]();
                };
                /**
                 * @description 加载option
                 * @param xmlUrl
                 * @param id
                 */
                Site.prototype.loadOption = function (xmlUrl, id) {
                    var doc = new ActiveXObject("MSXML2.DOMDocument"); //RfSoft.Common.CreateXMLDOM();
                    //读取系统XML文件
                    var handlerUrl = "/Portal/RfSoft.MapleTr.DPS/Site/Control/CommonRequestHandler2.ashx";
                    var xml;
                    $.ajax({
                        url: handlerUrl,
                        cache: false,
                        async: true,
                        type: "Get",
                        data: {
                            action: "GETXML",
                            xmlUrl: xmlUrl
                        },
                        success: (function (data) {
                            xml = data.toString();
                            doc.loadXML(xml);
                            var $parent = $("#" + id).empty();
                            var nodes = doc.documentElement.childNodes;
                            $(nodes).each(function () {
                                if (this.nodeType === 1) {
                                    var id_1 = this.attributes[0].text;
                                    var name_1 = this.attributes[1].text;
                                    var url = this.attributes[2].text;
                                    $parent.append('<option value="' + id_1 + '" url="' + url + '">' + name_1 + '</option>');
                                }
                            });
                        }),
                        error: function (jqXHR, status, message) {
                            alert("获取系统xml出错,原因：" + message);
                        }
                    });
                };
                /**
                 * @description 设置主题图片
                 */
                Site.prototype.setThemeImg = function () {
                    var select = document.getElementById("siteTheme");
                    //TODO:获取option
                    var options = select.selectedOptions;
                    //20150909 zhoulin update 改成JQuery方式
                    if (options != null) {
                        $("#ThemeImg").attr({ src: options[0].value, alt: options[0].value });
                    }
                };
                /**
                 * @description 设置头部图片
                 */
                Site.prototype.setHeaderImg = function () {
                    var select = document.getElementById("headerimage");
                    //TODO:获取option
                    var options = select.selectedOptions;
                    //20150909 zhoulin update 改成JQuery方式
                    //$("#ThemeImg").attr({ src: option.url, alt: $(option).text()});
                    if (options != null) {
                        $("#ThemeImg").attr({ src: options[0].value, alt: options[0].value });
                    }
                };
                /**
                 * @description 初始化绑定站点信息
                 * @param siteId
                 * @param isAdd
                 */
                Site.prototype.bindSiteInfo = function (siteId, isAdd) {
                    if (siteId == "0") { //站点根节点直接只在站点信息
                        this.bindSite(siteId, isAdd);
                    }
                    else {
                        var result = this.checkSiteIsExsit(siteId); //根据站点ID验证站点是否存在
                        if (result.toLowerCase() == "false") {
                            alert("站点不存在！");
                            //刷新树
                            var obj = window.parent.document;
                            obj.location.href = "/Portal/RfSoft.MapleTr.DPS/Site/html/SiteManage.htm";
                            return;
                        }
                        else if (result.toLowerCase() == "true") {
                            this.bindSite(siteId, isAdd);
                        }
                    }
                };
                /**
                 * @description 绑定站点信息
                 * @param siteId
                 * @param isAdd
                 */
                Site.prototype.bindSite = function (siteId, isAdd) {
                    var authorize = false;
                    if (isAdd)
                        //TODO:获取授权
                        authorize = true; //RfSoft.MapleTr.DPS.Security.HasAuthorize("RfSoft.MapleTr.DPS.Site.Add");
                    else {
                        //TODO:获取授权
                        authorize = true; //RfSoft.MapleTr.DPS.Security.HasAuthorize("RfSoft.MapleTr.DPS.Site.Update");
                    }
                    $("#btnSave")[authorize ? "show" : "hide"]();
                    this.addOption = isAdd;
                    if (!isAdd) {
                        var siteInfo = this.GetSiteById(siteId);
                        this.currentSiteInfo = siteInfo;
                    }
                    else {
                        this.currentSiteInfo = new SiteInfo();
                    }
                    this.initPageData();
                };
                /**
                 * @description 检查站点信息是否存在
                 * @param siteId
                 * @return {string}
                 */
                Site.prototype.checkSiteIsExsit = function (siteId) {
                    var handlerUrl = "/Portal/RfSoft.MapleTr.DPS/Site/Control/CommonRequestHandler2.ashx";
                    var result = "true";
                    $.ajax({
                        url: handlerUrl,
                        cache: false,
                        async: false,
                        type: 'Get',
                        data: {
                            action: "CHECKSITEISEXSIT",
                            siteId: siteId
                        },
                        success: (function (data) {
                            result = data.toString();
                        }),
                        error: function (jqXHR, status, message) {
                            alert("获取系统xml出错");
                        }
                    });
                    return result;
                };
                /**
                 *@description 初始化页面数据
                 */
                Site.prototype.initPageData = function () {
                    $("#titleLab").text(this.addOption ? "新建站点" : "编辑站点");
                    $("#siteDisplayName").val(this.currentSiteInfo.DisplayName);
                    $("#siteName").attr({ "disabled": !this.addOption, "value": this.currentSiteInfo.Name });
                    $("#siteType").attr({ "disabled": !this.addOption, "value": this.currentSiteInfo.Sitetype });
                    $("#imageIconURL").attr({ "src": this.currentSiteInfo.IconURL, "value": this.currentSiteInfo.IconURL });
                    $("#siteURL").attr({ "disabled": !this.addOption, "value": this.currentSiteInfo.URL });
                    $("#sysSite").val(this.currentSiteInfo.IsSysSite ? "1" : "0");
                    $("#defaultSite").val(this.currentSiteInfo.IsDefault ? "1" : "0");
                    $("#siteTheme").val(this.currentSiteInfo.Theme);
                    $("#headerimage").val(this.currentSiteInfo.HeaderImage);
                    $("#siteDisplay").attr({
                        "disabled": !this.currentSiteInfo.IsSysSite,
                        "value": this.currentSiteInfo.IsDisplay ? "1" : "0"
                    });
                    var isVirtualSite = (this.currentSiteInfo.Sitetype === 0);
                    $("#tr_url")[isVirtualSite ? "hide" : "show"]();
                    //$("#trtheme")[isVirtualSite ? "show" : "hide"]();
                    $("#trheaderimage")[isVirtualSite ? "show" : "hide"]();
                    //setThemeImg();
                    this.setHeaderImg();
                    $("#chb_org")[0].checked = this.currentSiteInfo.IsStartUpSiteOrg.toString().toLowerCase() == "true";
                    this.changeSiteOrgPanelState($("#chb_org")[0]);
                    $("#txt_siteOrg").val(this.currentSiteInfo.SiteOrgName);
                    $("#hid_siteOrg").val(this.currentSiteInfo.SiteOrgID);
                    $("#cjb_dblink")[0].checked = this.currentSiteInfo.IsStartUpSiteDB.toString().toLowerCase() == "true";
                    this.changeDBLinkPanelState($("#cjb_dblink")[0]);
                    $("#DBName").val(this.currentSiteInfo.DBName);
                    $("#DBPwd").val(this.currentSiteInfo.DBPwd);
                    $("#DBServiceName").val(this.currentSiteInfo.DBServiceName);
                    $("#validate_sitedisplayName").html("");
                    $("#validate_sitename").html("");
                    $("#validate_siteURL").html("");
                };
                /**
                 * @description 切换选择
                 * @param e
                 */
                Site.prototype.selectChange = function (e) {
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
                            $("#siteDisplay").attr({ "disabled": e.value !== '1', "value": e.value });
                            break;
                        case "siteType":
                            this.helpdisplay(e.id + "_" + e.value, "");
                            var isVirtualSite = (e.value === '0');
                            $("#tr_url")[isVirtualSite ? "hide" : "show"]();
                            // $("#trtheme")[isVirtualSite ? "show" : "hide"]();
                            $("#trheaderimage")[isVirtualSite ? "show" : "hide"]();
                            //if (top._isstartupsiteorg == "true")
                            if (window.top._isstartupsiteorg == "true")
                                $("#trOrganization")[isVirtualSite ? "show" : "hide"]();
                            //if (top._isstartupsitedb == "true")
                            if (window.top._isstartupsitedb == "true")
                                $("#trDBLink")[isVirtualSite ? "show" : "hide"]();
                            $('#siteURL').attr({ "disabled": isVirtualSite, "value": '' });
                            this.setSiteUrl();
                            break;
                        default:
                            this.helpdisplay(e.id + "_" + e.value);
                            break;
                    }
                };
                /**
                 * @description 设置站点url
                 */
                Site.prototype.setSiteUrl = function () {
                    if ($("#siteType").val() === '0') {
                        var enName = $("#siteName").val();
                        //TODO:验证是否为空
                        //if (!RfSoft.Common.Validate.IsNullOrEmpty(enName)) {
                        if (true) {
                            $("#siteURL").val("~/" + enName + "/Default.aspx");
                        }
                    }
                };
                /**
                 * @description 验证站点显示名
                 * @returns {boolean}
                 */
                Site.prototype.checkDisplayName = function () {
                    var obj = $('#siteDisplayName')[0];
                    var tabId = "validate_sitedisplayName";
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
                };
                /**
                 * @description 验证站点英文名称
                 * @return {boolean}
                 */
                Site.prototype.checkEnName = function () {
                    if (!this.addOption)
                        return true;
                    var obj = $('#siteName')[0];
                    var tabId = "validate_sitename";
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
                    var msg = this.checkEnNameExisted();
                    if (msg) {
                        this.setErrorClass(tabId, msg);
                        return false;
                    }
                    document.getElementById(tabId).innerHTML = "";
                    return true;
                };
                /**
                 * @description 验证URL
                 * @return {boolean}
                 */
                Site.prototype.checkURL = function () {
                    if (!this.addOption)
                        return true;
                    var obj = $('#siteURL')[0];
                    var tabId = "validate_siteURL";
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
                };
                /**
                 * @description 验证英文名称是否存在
                 * @return {any}
                 */
                Site.prototype.checkEnNameExisted = function () {
                    try {
                        var resultStr_1 = "";
                        $.ajax({
                            url: this.SiteManagerHandler,
                            cache: false,
                            async: false,
                            type: 'Get',
                            data: {
                                action: "nameisused",
                                name: $("#siteName").val()
                            },
                            success: (function (data) {
                                resultStr_1 = data.toString();
                            }),
                            error: function (jqXHR, status, message) {
                                alert("验证英文名出错");
                            }
                        });
                        var result = $.parseJSON(resultStr_1);
                        if (result.result === true)
                            return "名称已被使用";
                        return "";
                    }
                    catch (e) {
                        return "连接到服务器失败";
                    }
                };
                /**
                 * @description 数据库链接检查
                 * @param obj
                 * @return {boolean}
                 */
                Site.prototype.checkDBLink = function (obj) {
                    if (obj != null && obj != undefined) {
                        if ($(obj).val())
                            $("#validate_" + obj.id).html("");
                        else
                            $("#validate_" + obj.id).html("不可为空");
                        return;
                    }
                    var dbLink = $("#cjb_dblink")[0];
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
                };
                /**
                 * @description 错误信息提示
                 * @param objstr
                 * @param errortext
                 */
                Site.prototype.setErrorClass = function (objstr, errortext) {
                    $('#' + objstr + '').addClass("validate_error").html(errortext);
                };
                /**
                 * @description 显示帮助信息
                 * @param obj
                 * @param msg
                 */
                Site.prototype.helpdisplay = function (obj, msg) {
                    var html = '';
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
                };
                /**
                 * @description 保存站点
                 */
                Site.prototype.saveSite = function () {
                    var _this = this;
                    if (this.checkDisplayName() && this.checkEnName() && this.checkURL() && this.checkDBLink()) {
                        this.GetSite();
                        var jsonStr = this.convertToJsonStr(this.currentSiteInfo);
                        var option_1 = this.addOption ? 'add' : 'update';
                        var result_1 = "";
                        try {
                            $.ajax({
                                url: this.SiteManagerHandler,
                                cache: false,
                                async: true,
                                type: 'Post',
                                data: {
                                    action: option_1,
                                    site: jsonStr
                                },
                                success: (function (data) {
                                    result_1 = data.toString();
                                    if (result_1 != "") {
                                        var executeResult = $.parseJSON(result_1);
                                        if (executeResult.result) {
                                            if (_this.addOption) {
                                                _this.currentSiteInfo.ID = executeResult.data;
                                            }
                                            window.parent.editCallback(_this.currentSiteInfo, _this.addOption);
                                            _this.addOption = false;
                                            _this.initPageData();
                                            alert("保存成功。");
                                        }
                                        else {
                                            alert("保存失败。");
                                            if (option_1 == "update") { //站点缓存并发操作处理，保存失败时重新加载树 2013-12-27 liudf
                                                var obj = window.parent.document;
                                                obj.location.href = "/Portal/RfSoft.MapleTr.DPS/Site/html/SiteManage.htm";
                                            }
                                        }
                                    }
                                }),
                                error: function (jqXHR, status, message) {
                                    alert("更新站点失败，原因是：" + message);
                                }
                            });
                        }
                        catch (e) {
                            alert("连接到服务器失败");
                        }
                    }
                };
                /**
                 * @description 删除站点
                 * @param {string} siteId
                 */
                Site.prototype.deleteSite = function (siteId) {
                    var result = "";
                    try {
                        $.ajax({
                            url: this.SiteManagerHandler,
                            cache: false,
                            async: true,
                            type: 'Post',
                            data: {
                                action: "delete",
                                siteId: siteId
                            },
                            success: (function (data) {
                                result = data.toString();
                                if (result != "") {
                                    var executeResult = $.parseJSON(result);
                                    if (executeResult.result) {
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                                }
                            }),
                            error: function (jqXHR, status, message) {
                                alert("删除失败，原因是：" + message);
                                return false;
                            }
                        });
                    }
                    catch (e) {
                        alert("连接到服务器失败");
                        return false;
                    }
                };
                /**
                 * @description 获取页面中的值
                 * @constructor
                 */
                Site.prototype.GetSite = function () {
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
                    this.currentSiteInfo.IsStartUpSiteOrg = $("#chb_org")[0].checked ? "true" : "false";
                    if (this.currentSiteInfo.IsStartUpSiteOrg == "true") {
                        this.currentSiteInfo.SiteOrgName = $("#txt_siteOrg").val();
                    }
                    this.currentSiteInfo.SiteOrgID = $("#hid_siteOrg").val();
                    this.currentSiteInfo.IsStartUpSiteDB = $("#cjb_dblink")[0].checked ? "true" : "false";
                    this.currentSiteInfo.DBName = $("#DBName").val();
                    this.currentSiteInfo.DBPwd = $("#DBPwd").val();
                    this.currentSiteInfo.DBServiceName = $("#DBServiceName").val();
                };
                /**
                 * @description 转换为json
                 * @param site
                 * @return {string}
                 */
                Site.prototype.convertToJsonStr = function (site) {
                    var jsonStr = '{';
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
                };
                /**
                 * @description 选择站点部门
                 * @return {boolean}
                 */
                Site.prototype.selSiteOrg = function () {
                    var obj = new DialogObject();
                    obj.isMutilItems = true;
                    obj.type = 'ORG';
                    obj.isStartupSiteOrgFiltrate = false;
                    obj.NameControl = $('<INPUT>').val($('#txt_siteOrg').val());
                    obj.IdControl = $('<INPUT>').val($("#hid_siteOrg").val());
                    var result = { operate: "", names: "", ids: "" }; //TODO:RfSoft.MapleTr.DPS.Hr.openDeptOrRoleDialog(obj);
                    if (result.operate == 'EXIT') {
                        return false;
                    }
                    $('#txt_siteOrg').val(result.names);
                    $("#hid_siteOrg").val(result.ids);
                };
                /**
                 * @description 是否启用部门过滤验证
                 * @param obj
                 */
                Site.prototype.changeSiteOrgPanelState = function (obj) {
                    if (obj.checked) {
                        $("#div_siteOrg").show();
                    }
                    else {
                        $("#div_siteOrg").hide();
                    }
                    $("#txt_siteOrg").html('<span style="color:Gray;">如果为空，站点不启用部门过滤</span>');
                };
                /**
                 * @description 是否使用数据库验证
                 * @param obj
                 */
                Site.prototype.changeDBLinkPanelState = function (obj) {
                    if (obj.checked) {
                        $("#div_dbLink").show();
                    }
                    else {
                        $("#div_dbLink").hide();
                    }
                };
                /**
                 * @description 得到当前人员访问的站点
                 * @param {boolean} noCache
                 * @returns {any}
                 * @constructor
                 */
                Site.prototype.CurrentSite = function (noCache) {
                    var site;
                    if (noCache) {
                        var returnValue_1 = "";
                        $.ajax({
                            url: this.SITE_RUNTIME_HANDLER,
                            cache: false,
                            async: false,
                            type: 'Get',
                            data: {
                                action: 'currentsite',
                                noCache: Math.random()
                            },
                            success: (function (data) {
                                returnValue_1 = data.toString();
                            }),
                            error: function (jqXHR, status, message) {
                                alert("获取当前站点出错，原因是" + message);
                            }
                        });
                        try {
                            var result = $.parseJSON(returnValue_1);
                            if (result.result === true)
                                return result.site;
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
                };
                /**
                 * @description 获取系统默认站点
                 * @returns {any}
                 * @constructor
                 */
                Site.prototype.DefaultSite = function () {
                    var sendXml = "<Execute option='getdefaultsite'/>";
                    var returnValue = "";
                    $.ajax({
                        url: this.SITE_RUNTIME_HANDLER,
                        cache: false,
                        async: false,
                        type: 'Get',
                        data: {
                            action: 'getdefaultsite'
                        },
                        success: (function (data) {
                            returnValue = data.toString();
                        }),
                        error: function (jqXHR, status, message) {
                            alert("获取默认站点出错，原因：" + message);
                        }
                    });
                    try {
                        var result = $.parseJSON(returnValue);
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
                };
                /**
                 * @description 根据站点id获取站点
                 * @param {string} siteId
                 * @returns {any}
                 * @constructor
                 */
                Site.prototype.GetSiteById = function (siteId) {
                    var returnValue = "";
                    $.ajax({
                        url: this.SITE_RUNTIME_HANDLER,
                        cache: false,
                        async: false,
                        type: 'Get',
                        data: {
                            action: 'getsitebyid',
                            siteId: siteId
                        },
                        success: (function (data) {
                            returnValue = data.toString();
                        }),
                        error: function (jqXHR, status, message) {
                            alert("根据id获取站点失败，原因是：" + message);
                        }
                    });
                    try {
                        var result = $.parseJSON(returnValue);
                        if (result.result === true)
                            return $.parseJSON(result.data);
                    }
                    catch (e) {
                        return null;
                    }
                };
                /**
                 * @description 根据人员id获取默认站点
                 * @param {string} userId
                 * @returns {any}
                 * @constructor
                 */
                Site.prototype.GetDefaultSiteByUserId = function (userId) {
                    var returnValue = "";
                    $.ajax({
                        url: this.SITE_RUNTIME_HANDLER,
                        cache: false,
                        async: false,
                        type: 'Get',
                        data: {
                            action: 'getuserdefaultsite',
                            userId: userId
                        },
                        success: (function (data) {
                            returnValue = data.toString();
                        }),
                        error: function (jqXHR, status, message) {
                            alert("获取用户默认站点失败，原因是：" + message);
                        }
                    });
                    try {
                        var result = $.parseJSON(returnValue);
                        if (result.result === true)
                            return $.parseJSON(result.data);
                    }
                    catch (e) {
                        return null;
                    }
                };
                /**
                 * @description 根据url获取站点id
                 * @param {string} url
                 * @returns {string}
                 * @constructor
                 */
                Site.prototype.GetSiteIdByURL = function (url) {
                    var returnValue = "";
                    $.ajax({
                        url: this.SITE_RUNTIME_HANDLER,
                        cache: false,
                        async: false,
                        type: 'Get',
                        data: {
                            action: 'getsiteidbyurl',
                            siteUrl: url
                        },
                        success: (function (data) {
                            returnValue = data.toString();
                        }),
                        error: function (jqXHR, status, message) {
                            alert("获取站点id失败");
                        }
                    });
                    try {
                        var result = $.parseJSON(returnValue);
                        if (result.result === true)
                            return $.parseJSON(result.data).siteId;
                    }
                    catch (e) {
                        return "";
                    }
                };
                /**
                 * @description 根据userId获取人员有权限的站点集合
                 * @param {string} userId
                 * @returns {any}
                 * @constructor
                 */
                Site.prototype.GetSitesByUser = function (userId) {
                    var returnValue = "";
                    $.ajax({
                        url: this.SITE_RUNTIME_HANDLER,
                        cache: false,
                        async: false,
                        type: 'Get',
                        data: {
                            action: 'getsitesbyuser',
                            userId: userId
                        },
                        success: (function (data) {
                            returnValue = data.toString();
                        }),
                        error: function (jqXHR, status, message) {
                            alert("根据获取站点失败");
                        }
                    });
                    try {
                        var result = $.parseJSON(returnValue);
                        if (result.result === true)
                            return $.parseJSON(result.data);
                    }
                    catch (e) {
                        return null;
                    }
                };
                /**
                 * @description 获取不同的站点树集合
                 * @param {string} objId
                 * @param {string} type
                 * @returns {any}
                 * @constructor
                 */
                Site.prototype.GetSitesByType = function (objId, type) {
                    var returnValue = "";
                    $.ajax({
                        url: this.SITE_RUNTIME_HANDLER,
                        cache: false,
                        async: false,
                        type: 'Get',
                        data: {
                            action: 'getsitesbytype',
                            objId: objId,
                            type: type
                        },
                        success: (function (data) {
                            returnValue = data.toString();
                        }),
                        error: function (jqXHR, status, message) {
                            alert("根据获取站点失败");
                        }
                    });
                    try {
                        var result = $.parseJSON(returnValue);
                        if (result.result === true)
                            return $.parseJSON(result.data);
                    }
                    catch (e) {
                        return null;
                    }
                };
                return Site;
            }());
            DPS.Site = Site;
        })(DPS = MapleTr.DPS || (MapleTr.DPS = {}));
    })(MapleTr = RfSoft.MapleTr || (RfSoft.MapleTr = {}));
})(RfSoft = exports.RfSoft || (exports.RfSoft = {}));
},{}],2:[function(require,module,exports){
"use strict";
/// <reference path="jquery.d.ts"/>
/// <reference path="kendo.all.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var RfSoft_MapleTr_DPS_Site_1 = require("./RfSoft.MapleTr.DPS.Site");
var SiteService = /** @class */ (function () {
    function SiteService() {
        this.site = new RfSoft_MapleTr_DPS_Site_1.RfSoft.MapleTr.DPS.Site();
    }
    SiteService.prototype.Init = function (treeContainerId) {
        this.InitTree(treeContainerId);
        this.site.initContentPage();
    };
    /**
     * @description 初始化站点树
     * @param {string} containerId
     * @constructor
     */
    SiteService.prototype.InitTree = function (containerId) {
        var data = [
            {
                ID: "0",
                Name: "站点根节点",
                ChildSites: [
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
        var dataSource = new kendo.data.HierarchicalDataSource({
            data: data,
            schema: {
                model: {
                    id: "ID",
                    children: "ChildSites",
                    expanded: true
                }
            }
        });
        var siteService = this;
        this.siteTree = new kendo.ui.TreeView($("#" + containerId)[0], {
            checkboxes: false,
            dataSource: dataSource,
            dataTextField: "Name",
        });
    };
    ;
    /**
     * @description 添加站点
     * @constructor
     */
    SiteService.prototype.AddSite = function () {
        this.site.bindSite("0", true);
    };
    /**
     * @description 删除站点
     * @constructor
     */
    SiteService.prototype.DeleteSite = function () {
        //获取树的选中节点
        var node = this.siteTree.select();
        var id = "";
        if (node.length == 0) {
            alert("没有选择任何站点");
            return;
        }
        else {
            id = this.siteTree.dataItem(node).id;
        }
        if (confirm("确定要删除吗？")) {
            //执行删除
            var result = this.site.deleteSite(id);
            if (result) {
                alert("删除成功");
                //刷新树
                this.siteTree.dataSource.read();
            }
            else {
                alert("删除失败");
            }
        }
    };
    return SiteService;
}());
var SiteManage = /** @class */ (function () {
    function SiteManage() {
    }
    SiteManage.prototype.Init = function () {
        var site = new SiteService();
        site.Init("divInitTree");
    };
    return SiteManage;
}());
exports.default = SiteManage;
$(document).ready(function () {
    var rs = new SiteManage();
    rs.Init();
});
},{"./RfSoft.MapleTr.DPS.Site":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvUmZTb2Z0Lk1hcGxlVHIuRFBTLlNpdGUudHMiLCJzcmMvU2l0ZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLG1DQUFtQztBQUNuQzs7R0FFRztBQUNIO0lBc0JJLGtCQUFZLFdBQXFCLEVBQ3JCLFNBQW1CLEVBQ25CLEVBQVcsRUFDWCxXQUFvQixFQUNwQixJQUFhLEVBQ2IsU0FBa0IsRUFDbEIsT0FBZ0IsRUFDaEIsWUFBcUIsRUFDckIsU0FBbUIsRUFDbkIsUUFBaUIsRUFDakIsU0FBbUIsRUFDbkIsR0FBWSxFQUNaLEtBQWMsRUFDZCxXQUFvQixFQUNwQixnQkFBeUIsRUFDekIsU0FBa0IsRUFDbEIsV0FBb0IsRUFDcEIsZUFBd0IsRUFDeEIsTUFBZSxFQUNmLEtBQWMsRUFDZCxhQUFzQjtRQW5DbEMsWUFBTyxHQUFXLDZDQUE2QyxDQUFDLENBQUEsTUFBTTtRQW9DbEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFD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QixLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbEIsT0FBTztTQUNWO2FBQ0k7WUFDRCxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDcEIsTUFBTTtZQUNOLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLElBQUksTUFBTSxFQUFFO2dCQUNSLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDZCxLQUFLO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ25DO2lCQUFNO2dCQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTthQUNoQjtTQUNKO0lBQ0wsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0E1R0EsQUE0R0MsSUFBQTtBQUVEO0lBQUE7SUFLQSxDQUFDO0lBSkcseUJBQUksR0FBSjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUxBLEFBS0MsSUFBQTs7QUFDRCxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2QsSUFBSSxFQUFFLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUMxQixFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDZCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJqcXVlcnkuZC50c1wiLz5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvbiDnq5nngrnkv6Hmga/nsbtcclxuICovXHJcbmNsYXNzIFNpdGVJbmZvIHtcclxuICAgIElzQW5vbnltb3VzOiBib29sZWFuO1xyXG4gICAgSXNEZWZhdWx0OiBib29sZWFuOy8v5piv5ZCm5piv6buY6K6k56uZ54K5XHJcbiAgICBJRDogc3RyaW5nOy8v56uZ54K5aWRcclxuICAgIERpc3BsYXlOYW1lOiBzdHJpbmc7Ly/nq5nngrnmmL7npLrlkI1cclxuICAgIE5hbWU6IHN0cmluZzsvL+ermeeCueWQjeensFxyXG4gICAgU2l0ZUFkbWluOiBzdHJpbmc7Ly/nq5nngrnnrqHnkIblkZhcclxuICAgIEljb25VUkw6IHN0cmluZyA9IFwiL1RoZW1lcy9JbWFnZS9pY29ucy91bmRpZmluZWQvc2l0ZV9ob21lLnBuZ1wiOy8v56uZ54K55Zu+5qCHXHJcbiAgICBQYXJlbnRTaXRlSWQ6IHN0cmluZzsvL+eItue6p+ermeeCuWlkXHJcbiAgICBJc1N5c1NpdGU6IGJvb2xlYW47Ly/mmK/lkKbmmK/ns7vnu5/nq5nngrlcclxuICAgIFNpdGV0eXBlOiBudW1iZXI7Ly/nq5nngrnnsbvlnotcclxuICAgIElzRGlzcGxheTogYm9vbGVhbjsvL+aYr+WQpuaYvuekulxyXG4gICAgVVJMOiBzdHJpbmc7Ly/nq5nngrnpk77mjqVcclxuICAgIFRoZW1lOiBzdHJpbmc7Ly/kuLvpophcclxuICAgIEhlYWRlckltYWdlOiBzdHJpbmc7Ly/lpLTpg6jlm77niYdcclxuICAgIElzU3RhcnRVcFNpdGVPcmc6IHN0cmluZzsvL+aYr+WQpuW8gOWQr+mDqOmXqOi/h+a7pFxyXG4gICAgU2l0ZU9yZ0lEOiBzdHJpbmc7Ly/nq5nngrnpg6jpl6hpZFxyXG4gICAgU2l0ZU9yZ05hbWU6IHN0cmluZzsvL+ermeeCuemDqOmXqOWQjeensFxyXG4gICAgSXNTdGFydFVwU2l0ZURCOiBzdHJpbmc7Ly/mmK/lkKblvIDlkK/kuJrliqHmlbDmja7liIblupPnrqHnkIZcclxuICAgIERCTmFtZTogc3RyaW5nOy8v5pWw5o2u5bqT5ZCNXHJcbiAgICBEQlB3ZDogc3RyaW5nOy8v5pWw5o2u5bqT5a+G56CBXHJcbiAgICBEQlNlcnZpY2VOYW1lOiBzdHJpbmc7Ly/mlbDmja7lupPmnI3liqHlkI1cclxuICAgIGNvbnN0cnVjdG9yKElzQW5vbnltb3VzPzogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgIElzRGVmYXVsdD86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICBJRD86IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIERpc3BsYXlOYW1lPzogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgTmFtZT86IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIFNpdGVBZG1pbj86IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIEljb25VUkw/OiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBQYXJlbnRTaXRlSWQ/OiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBJc1N5c1NpdGU/OiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgU2l0ZXR5cGU/OiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICBJc0Rpc3BsYXk/OiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgVVJMPzogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgVGhlbWU/OiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBIZWFkZXJJbWFnZT86IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIElzU3RhcnRVcFNpdGVPcmc/OiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBTaXRlT3JnSUQ/OiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBTaXRlT3JnTmFtZT86IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIElzU3RhcnRVcFNpdGVEQj86IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIERCTmFtZT86IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIERCUHdkPzogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgREJTZXJ2aWNlTmFtZT86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuREJOYW1lID0gREJOYW1lID8gREJOYW1lIDogXCJcIjtcclxuICAgICAgICB0aGlzLkRCUHdkID0gREJQd2QgPyBEQlB3ZCA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5EQlNlcnZpY2VOYW1lID0gREJTZXJ2aWNlTmFtZSA/IERCU2VydmljZU5hbWUgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMuRGlzcGxheU5hbWUgPSBEaXNwbGF5TmFtZSA/IERpc3BsYXlOYW1lIDogXCJcIjtcclxuICAgICAgICB0aGlzLkhlYWRlckltYWdlID0gSGVhZGVySW1hZ2UgPyBIZWFkZXJJbWFnZSA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5JY29uVVJMID0gSWNvblVSTCA/IEljb25VUkwgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMuSUQgPSBJRCA/IElEIDogXCJcIjtcclxuICAgICAgICB0aGlzLklzQW5vbnltb3VzID0gSXNBbm9ueW1vdXMgPyBJc0Fub255bW91cyA6IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuSXNEaXNwbGF5ID0gSXNEaXNwbGF5ID8gSXNEaXNwbGF5IDogZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Jc0RlZmF1bHQgPSBJc0RlZmF1bHQgPyBJc0RlZmF1bHQgOiBmYWxzZTtcclxuICAgICAgICB0aGlzLklzU3RhcnRVcFNpdGVPcmcgPSBJc1N0YXJ0VXBTaXRlT3JnID8gSXNTdGFydFVwU2l0ZU9yZyA6IFwiZmFsc2VcIjtcclxuICAgICAgICB0aGlzLklzU3RhcnRVcFNpdGVEQiA9IElzU3RhcnRVcFNpdGVEQiA/IElzU3RhcnRVcFNpdGVEQiA6IFwiZmFsc2VcIjtcclxuICAgICAgICB0aGlzLklzU3lzU2l0ZSA9IElzU3lzU2l0ZSA/IElzU3lzU2l0ZSA6IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuTmFtZSA9IE5hbWUgPyBOYW1lIDogXCJcIjtcclxuICAgICAgICB0aGlzLlBhcmVudFNpdGVJZCA9IFBhcmVudFNpdGVJZCA/IFBhcmVudFNpdGVJZCA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5TaXRlQWRtaW4gPSBTaXRlQWRtaW4gPyBTaXRlQWRtaW4gOiBcIlwiO1xyXG4gICAgICAgIHRoaXMuU2l0ZU9yZ0lEID0gU2l0ZU9yZ0lEID8gU2l0ZU9yZ0lEIDogXCJcIjtcclxuICAgICAgICB0aGlzLlNpdGVPcmdOYW1lID0gU2l0ZU9yZ05hbWUgPyBTaXRlT3JnTmFtZSA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5TaXRldHlwZSA9IFNpdGV0eXBlID8gU2l0ZXR5cGUgOiAwO1xyXG4gICAgICAgIHRoaXMuVGhlbWUgPSBUaGVtZSA/IFRoZW1lIDogXCJcIjtcclxuICAgICAgICB0aGlzLlVSTCA9IFVSTCA/IFVSTCA6IFwiXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlvLnnqpflr7nosaHmqKHlnovnsbtcclxuICovXHJcbmNsYXNzIERpYWxvZ09iamVjdCB7XHJcbiAgICBpc011dGlsSXRlbXM6IGJvb2xlYW47XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICBpc1N0YXJ0dXBTaXRlT3JnRmlsdHJhdGU6IGJvb2xlYW47XHJcbiAgICBOYW1lQ29udHJvbDogYW55O1xyXG4gICAgSWRDb250cm9sOiBhbnk7XHJcbn1cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvbiDnq5nngrnmk43kvZzmlrnms5VcclxuICovXHJcbmV4cG9ydCBuYW1lc3BhY2UgUmZTb2Z0Lk1hcGxlVHIuRFBTIHtcclxuICAgIGV4cG9ydCBjbGFzcyBTaXRlIHtcclxuXHJcbiAgICAgICAgdGVzdFNpdGUoKTp2b2lke1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmlubmVyVGV4dD1cImZyb20gIFJmU29mdC5NYXBsZVRyLkRQUy5TaXRlXCI7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5odG1sKFwiZnJvbSAgUmZTb2Z0Lk1hcGxlVHIuRFBTLlNpdGVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g5b2T5YmN56uZ54K55L+h5oGvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY3VycmVudFNpdGVJbmZvOiBTaXRlSW5mbztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g5piv5ZCm5piv5re75YqgXHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYWRkT3B0aW9uOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g56uZ54K5566h55CG5pe26K+35rGC5LiA6Iis5aSE55CG56iL5bqP6Lev5b6EXHJcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICBTaXRlTWFuYWdlckhhbmRsZXI6IHN0cmluZyA9IFwiL1BvcnRhbC9SZlNvZnQuTWFwbGVUci5EUFMvU2l0ZS9Db250cm9sL1NpdGVNYW5hZ2VySGFuZGxlcjIuYXNoeFwiO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDnq5nngrnov5DooYzml7bor7fmsYLnmoTkuIDoiKzlpITnkIbmlofku7ZVUkzlnLDlnYBcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFNJVEVfUlVOVElNRV9IQU5ETEVSOiBzdHJpbmcgPSBcIi9Qb3J0YWwvUmZTb2Z0Lk1hcGxlVHIuRFBTL1NpdGUvQ29udHJvbC9TaXRlUnVuVGltZUhhbmRsZXIyLmFzaHhcIjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIOWIneWni+WMluermeeCueWGheWuuemhtVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGluaXRDb250ZW50UGFnZSgpIHtcclxuICAgICAgICAgICAgLy/mt7vliqDmnYPpmZDpqozor4FcclxuICAgICAgICAgICAgLy9UT0RPOiB0cnVl5pu/5o2i5Li65pa55rOV6aqM6K+BXHJcbiAgICAgICAgICAgIC8vaWYgKCFSZlNvZnQuTWFwbGVUci5EUFMuU2VjdXJpdHkuSGFzQXV0aG9yaXplKFwiUmZTb2Z0Lk1hcGxlVHIuRFBTLlNpdGUuVXBkYXRlXCIpKSB7XHJcbiAgICAgICAgICAgIGlmICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjYnRuU2F2ZScpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5Yqg6L295Li76aKY6aOO5qC8XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGhlbWVYbWxVcmwgPSAnL1BvcnRhbC9Db25maWcvU3lzdGVtVGhlbWVzLnhtbCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRPcHRpb24odGhlbWVYbWxVcmwsIFwic2l0ZVRoZW1lXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIuWKoOi9veezu+e7n+S4u+mimOmFjee9ruaWh+S7tuWksei0pe+8geWOn+WboO+8mlwiICsgZS5NZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WKoOi9vemhteWktOWbvueJh1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlWG1sVXJsID0gJy9Qb3J0YWwvQ29uZmlnL1N5c3RlbUhlYWRJbWFnZS54bWwnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkT3B0aW9uKGltYWdlWG1sVXJsLCBcImhlYWRlcmltYWdlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIuWKoOi9vemhteWktOWbvueJh+mFjee9ruaWh+S7tuWksei0pe+8geWOn+WboO+8mlwiICsgZS5NZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyQoXCIjdHJPcmdhbml6YXRpb25cIilbdG9wLl9pc3N0YXJ0dXBzaXRlb3JnID09IFwidHJ1ZVwiID8gXCJzaG93XCIgOiBcImhpZGVcIl0oKTtcclxuICAgICAgICAgICAgLy8kKFwiI3RyREJMaW5rXCIpW3RvcC5faXNzdGFydHVwc2l0ZWRiID09IFwidHJ1ZVwiID8gXCJzaG93XCIgOiBcImhpZGVcIl0oKTtcclxuICAgICAgICAgICAgJChcIiN0ck9yZ2FuaXphdGlvblwiKVsoPGFueT53aW5kb3cpLnRvcC5faXNzdGFydHVwc2l0ZW9yZyA9PSBcInRydWVcIiA/IFwic2hvd1wiIDogXCJoaWRlXCJdKCk7XHJcbiAgICAgICAgICAgICQoXCIjdHJEQkxpbmtcIilbKDxhbnk+d2luZG93KS50b3AuX2lzc3RhcnR1cHNpdGVkYiA9PSBcInRydWVcIiA/IFwic2hvd1wiIDogXCJoaWRlXCJdKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g5Yqg6L29b3B0aW9uXHJcbiAgICAgICAgICogQHBhcmFtIHhtbFVybFxyXG4gICAgICAgICAqIEBwYXJhbSBpZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxvYWRPcHRpb24oeG1sVXJsOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgbGV0IGRvYyA9IG5ldyBBY3RpdmVYT2JqZWN0KFwiTVNYTUwyLkRPTURvY3VtZW50XCIpOy8vUmZTb2Z0LkNvbW1vbi5DcmVhdGVYTUxET00oKTtcclxuICAgICAgICAgICAgLy/or7vlj5bns7vnu59YTUzmlofku7ZcclxuICAgICAgICAgICAgbGV0IGhhbmRsZXJVcmw6IHN0cmluZyA9IFwiL1BvcnRhbC9SZlNvZnQuTWFwbGVUci5EUFMvU2l0ZS9Db250cm9sL0NvbW1vblJlcXVlc3RIYW5kbGVyMi5hc2h4XCI7XHJcbiAgICAgICAgICAgIGxldCB4bWw6IHN0cmluZztcclxuICAgICAgICAgICAgJC5hamF4KDxKUXVlcnlBamF4U2V0dGluZ3M+e1xyXG4gICAgICAgICAgICAgICAgdXJsOiBoYW5kbGVyVXJsLFxyXG4gICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdldFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogXCJHRVRYTUxcIixcclxuICAgICAgICAgICAgICAgICAgICB4bWxVcmw6IHhtbFVybFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB4bWwgPSBkYXRhLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jLmxvYWRYTUwoeG1sKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQoXCIjXCIgKyBpZCkuZW1wdHkoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZXMgPSBkb2MuZG9jdW1lbnRFbGVtZW50LmNoaWxkTm9kZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgJChub2RlcykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGVUeXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaWQgPSB0aGlzLmF0dHJpYnV0ZXNbMF0udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gdGhpcy5hdHRyaWJ1dGVzWzFdLnRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5hdHRyaWJ1dGVzWzJdLnRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFwcGVuZCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBpZCArICdcIiB1cmw9XCInICsgdXJsICsgJ1wiPicgKyBuYW1lICsgJzwvb3B0aW9uPicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiAoanFYSFI6IEpRdWVyeVhIUiwgc3RhdHVzOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi6I635Y+W57O757ufeG1s5Ye66ZSZLOWOn+WboO+8mlwiICsgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIOiuvue9ruS4u+mimOWbvueJh1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNldFRoZW1lSW1nKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaXRlVGhlbWVcIikgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIC8vVE9ETzrojrflj5ZvcHRpb25cclxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSBzZWxlY3Quc2VsZWN0ZWRPcHRpb25zO1xyXG4gICAgICAgICAgICAvLzIwMTUwOTA5IHpob3VsaW4gdXBkYXRlIOaUueaIkEpRdWVyeeaWueW8j1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1RoZW1lSW1nXCIpLmF0dHIoe3NyYzogb3B0aW9uc1swXS52YWx1ZSwgYWx0OiBvcHRpb25zWzBdLnZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDorr7nva7lpLTpg6jlm77niYdcclxuICAgICAgICAgKi9cclxuICAgICAgICBzZXRIZWFkZXJJbWcoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlYWRlcmltYWdlXCIpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgICAgICAgICAvL1RPRE866I635Y+Wb3B0aW9uXHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0gc2VsZWN0LnNlbGVjdGVkT3B0aW9ucztcclxuICAgICAgICAgICAgLy8yMDE1MDkwOSB6aG91bGluIHVwZGF0ZSDmlLnmiJBKUXVlcnnmlrnlvI9cclxuICAgICAgICAgICAgLy8kKFwiI1RoZW1lSW1nXCIpLmF0dHIoeyBzcmM6IG9wdGlvbi51cmwsIGFsdDogJChvcHRpb24pLnRleHQoKX0pO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1RoZW1lSW1nXCIpLmF0dHIoe3NyYzogb3B0aW9uc1swXS52YWx1ZSwgYWx0OiBvcHRpb25zWzBdLnZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g5Yid5aeL5YyW57uR5a6a56uZ54K55L+h5oGvXHJcbiAgICAgICAgICogQHBhcmFtIHNpdGVJZFxyXG4gICAgICAgICAqIEBwYXJhbSBpc0FkZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJpbmRTaXRlSW5mbyhzaXRlSWQ6IHN0cmluZywgaXNBZGQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHNpdGVJZCA9PSBcIjBcIikgeyAvL+ermeeCueagueiKgueCueebtOaOpeWPquWcqOermeeCueS/oeaBr1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kU2l0ZShzaXRlSWQsIGlzQWRkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoZWNrU2l0ZUlzRXhzaXQoc2l0ZUlkKTsgLy/moLnmja7nq5nngrlJROmqjOivgeermeeCueaYr+WQpuWtmOWcqFxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC50b0xvd2VyQ2FzZSgpID09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi56uZ54K55LiN5a2Y5Zyo77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yi35paw5qCRXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IHdpbmRvdy5wYXJlbnQuZG9jdW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmxvY2F0aW9uLmhyZWYgPSBcIi9Qb3J0YWwvUmZTb2Z0Lk1hcGxlVHIuRFBTL1NpdGUvaHRtbC9TaXRlTWFuYWdlLmh0bVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3VsdC50b0xvd2VyQ2FzZSgpID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kU2l0ZShzaXRlSWQsIGlzQWRkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIOe7keWumuermeeCueS/oeaBr1xyXG4gICAgICAgICAqIEBwYXJhbSBzaXRlSWRcclxuICAgICAgICAgKiBAcGFyYW0gaXNBZGRcclxuICAgICAgICAgKi9cclxuICAgICAgICBiaW5kU2l0ZShzaXRlSWQ6IHN0cmluZywgaXNBZGQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IGF1dGhvcml6ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoaXNBZGQpXHJcbiAgICAgICAgICAgIC8vVE9ETzrojrflj5bmjojmnYNcclxuICAgICAgICAgICAgICAgIGF1dGhvcml6ZSA9IHRydWU7Ly9SZlNvZnQuTWFwbGVUci5EUFMuU2VjdXJpdHkuSGFzQXV0aG9yaXplKFwiUmZTb2Z0Lk1hcGxlVHIuRFBTLlNpdGUuQWRkXCIpO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vVE9ETzrojrflj5bmjojmnYNcclxuICAgICAgICAgICAgICAgIGF1dGhvcml6ZSA9IHRydWU7Ly9SZlNvZnQuTWFwbGVUci5EUFMuU2VjdXJpdHkuSGFzQXV0aG9yaXplKFwiUmZTb2Z0Lk1hcGxlVHIuRFBTLlNpdGUuVXBkYXRlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoXCIjYnRuU2F2ZVwiKVthdXRob3JpemUgPyBcInNob3dcIiA6IFwiaGlkZVwiXSgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZE9wdGlvbiA9IGlzQWRkO1xyXG4gICAgICAgICAgICBpZiAoIWlzQWRkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2l0ZUluZm8gPSB0aGlzLkdldFNpdGVCeUlkKHNpdGVJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTaXRlSW5mbyA9IHNpdGVJbmZvO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2l0ZUluZm8gPSBuZXcgU2l0ZUluZm8oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmluaXRQYWdlRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIOajgOafpeermeeCueS/oeaBr+aYr+WQpuWtmOWcqFxyXG4gICAgICAgICAqIEBwYXJhbSBzaXRlSWRcclxuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2hlY2tTaXRlSXNFeHNpdChzaXRlSWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCBoYW5kbGVyVXJsOiBzdHJpbmcgPSBcIi9Qb3J0YWwvUmZTb2Z0Lk1hcGxlVHIuRFBTL1NpdGUvQ29udHJvbC9Db21tb25SZXF1ZXN0SGFuZGxlcjIuYXNoeFwiO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gXCJ0cnVlXCI7XHJcbiAgICAgICAgICAgICQuYWpheCg8SlF1ZXJ5QWpheFNldHRpbmdzPntcclxuICAgICAgICAgICAgICAgIHVybDogaGFuZGxlclVybCxcclxuICAgICAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdHZXQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogXCJDSEVDS1NJVEVJU0VYU0lUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2l0ZUlkOiBzaXRlSWRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZGF0YS50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiAoanFYSFI6IEpRdWVyeVhIUiwgc3RhdHVzOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi6I635Y+W57O757ufeG1s5Ye66ZSZXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICpAZGVzY3JpcHRpb24g5Yid5aeL5YyW6aG16Z2i5pWw5o2uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaW5pdFBhZ2VEYXRhKCkge1xyXG4gICAgICAgICAgICAkKFwiI3RpdGxlTGFiXCIpLnRleHQodGhpcy5hZGRPcHRpb24gPyBcIuaWsOW7uuermeeCuVwiIDogXCLnvJbovpHnq5nngrlcIik7XHJcbiAgICAgICAgICAgICQoXCIjc2l0ZURpc3BsYXlOYW1lXCIpLnZhbCh0aGlzLmN1cnJlbnRTaXRlSW5mby5EaXNwbGF5TmFtZSk7XHJcbiAgICAgICAgICAgICQoXCIjc2l0ZU5hbWVcIikuYXR0cih7XCJkaXNhYmxlZFwiOiAhdGhpcy5hZGRPcHRpb24sIFwidmFsdWVcIjogdGhpcy5jdXJyZW50U2l0ZUluZm8uTmFtZX0pO1xyXG4gICAgICAgICAgICAkKFwiI3NpdGVUeXBlXCIpLmF0dHIoe1wiZGlzYWJsZWRcIjogIXRoaXMuYWRkT3B0aW9uLCBcInZhbHVlXCI6IHRoaXMuY3VycmVudFNpdGVJbmZvLlNpdGV0eXBlfSk7XHJcbiAgICAgICAgICAgICQoXCIjaW1hZ2VJY29uVVJMXCIpLmF0dHIoe1wic3JjXCI6IHRoaXMuY3VycmVudFNpdGVJbmZvLkljb25VUkwsIFwidmFsdWVcIjogdGhpcy5jdXJyZW50U2l0ZUluZm8uSWNvblVSTH0pO1xyXG4gICAgICAgICAgICAkKFwiI3NpdGVVUkxcIikuYXR0cih7XCJkaXNhYmxlZFwiOiAhdGhpcy5hZGRPcHRpb24sIFwidmFsdWVcIjogdGhpcy5jdXJyZW50U2l0ZUluZm8uVVJMfSk7XHJcbiAgICAgICAgICAgICQoXCIjc3lzU2l0ZVwiKS52YWwodGhpcy5jdXJyZW50U2l0ZUluZm8uSXNTeXNTaXRlID8gXCIxXCIgOiBcIjBcIik7XHJcbiAgICAgICAgICAgICQoXCIjZGVmYXVsdFNpdGVcIikudmFsKHRoaXMuY3VycmVudFNpdGVJbmZvLklzRGVmYXVsdCA/IFwiMVwiIDogXCIwXCIpO1xyXG4gICAgICAgICAgICAkKFwiI3NpdGVUaGVtZVwiKS52YWwodGhpcy5jdXJyZW50U2l0ZUluZm8uVGhlbWUpO1xyXG4gICAgICAgICAgICAkKFwiI2hlYWRlcmltYWdlXCIpLnZhbCh0aGlzLmN1cnJlbnRTaXRlSW5mby5IZWFkZXJJbWFnZSk7XHJcbiAgICAgICAgICAgICQoXCIjc2l0ZURpc3BsYXlcIikuYXR0cih7XHJcbiAgICAgICAgICAgICAgICBcImRpc2FibGVkXCI6ICF0aGlzLmN1cnJlbnRTaXRlSW5mby5Jc1N5c1NpdGUsXHJcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHRoaXMuY3VycmVudFNpdGVJbmZvLklzRGlzcGxheSA/IFwiMVwiIDogXCIwXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBpc1ZpcnR1YWxTaXRlOiBib29sZWFuID0gKHRoaXMuY3VycmVudFNpdGVJbmZvLlNpdGV0eXBlID09PSAwKTtcclxuICAgICAgICAgICAgJChcIiN0cl91cmxcIilbaXNWaXJ0dWFsU2l0ZSA/IFwiaGlkZVwiIDogXCJzaG93XCJdKCk7XHJcbiAgICAgICAgICAgIC8vJChcIiN0cnRoZW1lXCIpW2lzVmlydHVhbFNpdGUgPyBcInNob3dcIiA6IFwiaGlkZVwiXSgpO1xyXG4gICAgICAgICAgICAkKFwiI3RyaGVhZGVyaW1hZ2VcIilbaXNWaXJ0dWFsU2l0ZSA/IFwic2hvd1wiIDogXCJoaWRlXCJdKCk7XHJcbiAgICAgICAgICAgIC8vc2V0VGhlbWVJbWcoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRIZWFkZXJJbWcoKTtcclxuICAgICAgICAgICAgKCQoXCIjY2hiX29yZ1wiKVswXSBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkID0gdGhpcy5jdXJyZW50U2l0ZUluZm8uSXNTdGFydFVwU2l0ZU9yZy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT0gXCJ0cnVlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU2l0ZU9yZ1BhbmVsU3RhdGUoJChcIiNjaGJfb3JnXCIpWzBdIGFzIEhUTUxJbnB1dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAkKFwiI3R4dF9zaXRlT3JnXCIpLnZhbCh0aGlzLmN1cnJlbnRTaXRlSW5mby5TaXRlT3JnTmFtZSk7XHJcbiAgICAgICAgICAgICQoXCIjaGlkX3NpdGVPcmdcIikudmFsKHRoaXMuY3VycmVudFNpdGVJbmZvLlNpdGVPcmdJRCk7XHJcbiAgICAgICAgICAgICgkKFwiI2NqYl9kYmxpbmtcIilbMF0gYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZCA9IHRoaXMuY3VycmVudFNpdGVJbmZvLklzU3RhcnRVcFNpdGVEQi50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT0gXCJ0cnVlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlREJMaW5rUGFuZWxTdGF0ZSgkKFwiI2NqYl9kYmxpbmtcIilbMF0gYXMgSFRNTElucHV0RWxlbWVudCk7XHJcbiAgICAgICAgICAgICQoXCIjREJOYW1lXCIpLnZhbCh0aGlzLmN1cnJlbnRTaXRlSW5mby5EQk5hbWUpO1xyXG4gICAgICAgICAgICAkKFwiI0RCUHdkXCIpLnZhbCh0aGlzLmN1cnJlbnRTaXRlSW5mby5EQlB3ZCk7XHJcbiAgICAgICAgICAgICQoXCIjREJTZXJ2aWNlTmFtZVwiKS52YWwodGhpcy5jdXJyZW50U2l0ZUluZm8uREJTZXJ2aWNlTmFtZSk7XHJcbiAgICAgICAgICAgICQoXCIjdmFsaWRhdGVfc2l0ZWRpc3BsYXlOYW1lXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgICQoXCIjdmFsaWRhdGVfc2l0ZW5hbWVcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgJChcIiN2YWxpZGF0ZV9zaXRlVVJMXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g5YiH5o2i6YCJ5oupXHJcbiAgICAgICAgICogQHBhcmFtIGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBzZWxlY3RDaGFuZ2UoZTogSFRNTFNlbGVjdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgLy8g5qC55o2uaWTliKTmlq3ku5bpgInkuK3nmoTmmK/lk6rkuKpcclxuICAgICAgICAgICAgc3dpdGNoIChlLmlkKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwic2l0ZVRoZW1lXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8yMDE1MDkwOSB6aG91bGluIHVwZGF0ZSDmlLnmiJBKUXVlcnnmlrnlvI9cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlbHBkaXNwbGF5KFwidGhlbWVcIiwgJChlLm9wdGlvbnNbZS5zZWxlY3RlZEluZGV4XSkudGV4dCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRoZW1lSW1nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRIZWFkZXJJbWcoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJoZWFkZXJpbWFnZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVscGRpc3BsYXkoXCJzaXRlSGVhZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEhlYWRlckltZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInN5c1NpdGVcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlbHBkaXNwbGF5KGUuaWQgKyBcIl9cIiArIGUudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjc2l0ZURpc3BsYXlcIikuYXR0cih7XCJkaXNhYmxlZFwiOiBlLnZhbHVlICE9PSAnMScsIFwidmFsdWVcIjogZS52YWx1ZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInNpdGVUeXBlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWxwZGlzcGxheShlLmlkICsgXCJfXCIgKyBlLnZhbHVlLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXNWaXJ0dWFsU2l0ZSA9IChlLnZhbHVlID09PSAnMCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjdHJfdXJsXCIpW2lzVmlydHVhbFNpdGUgPyBcImhpZGVcIiA6IFwic2hvd1wiXSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICQoXCIjdHJ0aGVtZVwiKVtpc1ZpcnR1YWxTaXRlID8gXCJzaG93XCIgOiBcImhpZGVcIl0oKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI3RyaGVhZGVyaW1hZ2VcIilbaXNWaXJ0dWFsU2l0ZSA/IFwic2hvd1wiIDogXCJoaWRlXCJdKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAodG9wLl9pc3N0YXJ0dXBzaXRlb3JnID09IFwidHJ1ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoPGFueT53aW5kb3cpLnRvcC5faXNzdGFydHVwc2l0ZW9yZyA9PSBcInRydWVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiN0ck9yZ2FuaXphdGlvblwiKVtpc1ZpcnR1YWxTaXRlID8gXCJzaG93XCIgOiBcImhpZGVcIl0oKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2lmICh0b3AuX2lzc3RhcnR1cHNpdGVkYiA9PSBcInRydWVcIilcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKDxhbnk+d2luZG93KS50b3AuX2lzc3RhcnR1cHNpdGVkYiA9PSBcInRydWVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiN0ckRCTGlua1wiKVtpc1ZpcnR1YWxTaXRlID8gXCJzaG93XCIgOiBcImhpZGVcIl0oKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjc2l0ZVVSTCcpLmF0dHIoe1wiZGlzYWJsZWRcIjogaXNWaXJ0dWFsU2l0ZSwgXCJ2YWx1ZVwiOiAnJ30pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U2l0ZVVybCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlbHBkaXNwbGF5KGUuaWQgKyBcIl9cIiArIGUudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g6K6+572u56uZ54K5dXJsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2V0U2l0ZVVybCgpIHtcclxuICAgICAgICAgICAgaWYgKCQoXCIjc2l0ZVR5cGVcIikudmFsKCkgPT09ICcwJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuTmFtZSA9ICQoXCIjc2l0ZU5hbWVcIikudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAvL1RPRE866aqM6K+B5piv5ZCm5Li656m6XHJcbiAgICAgICAgICAgICAgICAvL2lmICghUmZTb2Z0LkNvbW1vbi5WYWxpZGF0ZS5Jc051bGxPckVtcHR5KGVuTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNzaXRlVVJMXCIpLnZhbChcIn4vXCIgKyBlbk5hbWUgKyBcIi9EZWZhdWx0LmFzcHhcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDpqozor4Hnq5nngrnmmL7npLrlkI1cclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjaGVja0Rpc3BsYXlOYW1lKCkge1xyXG4gICAgICAgICAgICBsZXQgb2JqID0gJCgnI3NpdGVEaXNwbGF5TmFtZScpWzBdIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGxldCB0YWJJZCA9IFwidmFsaWRhdGVfc2l0ZWRpc3BsYXlOYW1lXCI7XHJcbiAgICAgICAgICAgIC8vVE9ETzppZiAoUmZTb2Z0LkNvbW1vbi5WYWxpZGF0ZS5Jc051bGxPckVtcHR5KG9iaikpIHtcclxuICAgICAgICAgICAgaWYgKG9iaiA9PSBudWxsIHx8IG9iai52YWx1ZSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVycm9yQ2xhc3ModGFiSWQsIFwi5LiN5Y+v5Li656m6XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vVE9ETzppZiAoIVJmU29mdC5Db21tb24uVmFsaWRhdGUuSXNJbkxlbmd0aChvYmosIDIwKSkge1xyXG4gICAgICAgICAgICBpZiAob2JqLnZhbHVlLmxlbmd0aCA+IDIwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVycm9yQ2xhc3ModGFiSWQsIFwi6ZW/5bqm5LiN5Y+v6LaF6L+HMjBcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9UT0RPOmlmICghUmZTb2Z0LkNvbW1vbi5WYWxpZGF0ZS5Jc0V4cChvYmosIC9eW1xcdTRlMDAtXFx1OWZhNVxcd1xcKFxcKVxc77yIXFzvvIldKiQvKSkge1xyXG4gICAgICAgICAgICBpZiAoISgvXltcXHU0ZTAwLVxcdTlmYTVcXHdcXChcXClcXO+8iFxc77yJXSokLy50ZXN0KG9iai52YWx1ZSkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVycm9yQ2xhc3ModGFiSWQsIFwi5Y+q6IO95pyJ5pWw5a2X44CB5a2X5q+N44CB5rGJ5a2X44CB5LiL5YiS57q/5ZKM5ous5Y+357uE5oiQXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhYklkKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDpqozor4Hnq5nngrnoi7HmloflkI3np7BcclxuICAgICAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNoZWNrRW5OYW1lKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYWRkT3B0aW9uKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSAkKCcjc2l0ZU5hbWUnKVswXSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgICAgICBsZXQgdGFiSWQgPSBcInZhbGlkYXRlX3NpdGVuYW1lXCI7XHJcbiAgICAgICAgICAgIC8vVE9ETzppZiAoUmZTb2Z0LkNvbW1vbi5WYWxpZGF0ZS5Jc051bGxPckVtcHR5KG9iaikpIHtcclxuICAgICAgICAgICAgaWYgKG9iaiA9PSBudWxsIHx8IG9iai52YWx1ZSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVycm9yQ2xhc3ModGFiSWQsIFwi5LiN5Y+v5Li656m6XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vVE9ETzplbHNlIGlmICghUmZTb2Z0LkNvbW1vbi5WYWxpZGF0ZS5Jc0luTGVuZ3RoKG9iaiwgMjApKSB7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iai52YWx1ZS5sZW5ndGggPiAyMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFcnJvckNsYXNzKHRhYklkLCBcIumVv+W6puS4jei2hei/hzIwXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vVE9ETzplbHNlIGlmICghUmZTb2Z0LkNvbW1vbi5WYWxpZGF0ZS5Jc0V4cChvYmosIC9eW2EtekEtWl1cXHd7MCwzMH0kLykpIHtcclxuICAgICAgICAgICAgZWxzZSBpZiAoISgvXlthLXpBLVpdW2EtekEtWjAtOV0qJC8udGVzdChvYmoudmFsdWUpKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFcnJvckNsYXNzKHRhYklkLCBcIuWPquiDveaYr+Wtl+avjeOAgeaVsOWtl+OAgeS4i+WIkue6v+S4lOS7peWtl+avjeW8gOWktFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2Vsc2UgaWYgKCFSZlNvZnQuQ29tbW9uLlZhbGlkYXRlLklzSW5MZW5ndGgob2JqLCAyMCkpIHtcclxuICAgICAgICAgICAgLy8gICAgc2V0RXJyb3JDbGFzcyh0YWJJZCwgXCLplb/luqbkuI3otoXov4cyMFwiKTsgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgbGV0IG1zZyA9IHRoaXMuY2hlY2tFbk5hbWVFeGlzdGVkKCk7XHJcbiAgICAgICAgICAgIGlmIChtc2cpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RXJyb3JDbGFzcyh0YWJJZCwgbXNnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWJJZCkuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g6aqM6K+BVVJMXHJcbiAgICAgICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjaGVja1VSTCgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmFkZE9wdGlvbilcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgb2JqID0gJCgnI3NpdGVVUkwnKVswXSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgICAgICBsZXQgdGFiSWQgPSBcInZhbGlkYXRlX3NpdGVVUkxcIjtcclxuICAgICAgICAgICAgLy9UT0RPOmlmIChSZlNvZnQuQ29tbW9uLlZhbGlkYXRlLklzTnVsbE9yRW1wdHkob2JqKSkge1xyXG4gICAgICAgICAgICBpZiAob2JqID09IG51bGwgfHwgb2JqLnZhbHVlID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RXJyb3JDbGFzcyh0YWJJZCwgXCLkuI3lj6/kuLrnqbpcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9UT0RPOmlmICghUmZTb2Z0LkNvbW1vbi5WYWxpZGF0ZS5Jc0luTGVuZ3RoKG9iaiwgMjAwKSkge1xyXG4gICAgICAgICAgICBpZiAob2JqLnZhbHVlLmxlbmd0aCA+IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFcnJvckNsYXNzKHRhYklkLCBcIumVv+W6puS4jei2hei/hzIwMFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKlRPRE86aWYgKCFSZlNvZnQuQ29tbW9uLlZhbGlkYXRlLklzVVJMKG9iaikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRFcnJvckNsYXNzKHRhYklkLCBcIlVSTOagvOW8j+S4jeato+ehrlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhYklkKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDpqozor4Hoi7HmloflkI3np7DmmK/lkKblrZjlnKhcclxuICAgICAgICAgKiBAcmV0dXJuIHthbnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2hlY2tFbk5hbWVFeGlzdGVkKCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdFN0ciA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAkLmFqYXgoPEpRdWVyeUFqYXhTZXR0aW5ncz57XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLlNpdGVNYW5hZ2VySGFuZGxlcixcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdHZXQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBcIm5hbWVpc3VzZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJChcIiNzaXRlTmFtZVwiKS52YWwoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRTdHIgPSBkYXRhLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogKGpxWEhSOiBKUXVlcnlYSFIsIHN0YXR1czogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLpqozor4Hoi7HmloflkI3lh7rplJlcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gJC5wYXJzZUpTT04ocmVzdWx0U3RyKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmVzdWx0ID09PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIuWQjeensOW3suiiq+S9v+eUqFwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIui/nuaOpeWIsOacjeWKoeWZqOWksei0pVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g5pWw5o2u5bqT6ZO+5o6l5qOA5p+lXHJcbiAgICAgICAgICogQHBhcmFtIG9ialxyXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2hlY2tEQkxpbmsob2JqPzogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKG9iaiAhPSBudWxsICYmIG9iaiAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKG9iaikudmFsKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiN2YWxpZGF0ZV9cIiArIG9iai5pZCkuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI3ZhbGlkYXRlX1wiICsgb2JqLmlkKS5odG1sKFwi5LiN5Y+v5Li656m6XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBkYkxpbmsgPSAkKFwiI2NqYl9kYmxpbmtcIilbMF0gYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKCFkYkxpbmsuY2hlY2tlZClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoISQoXCIjREJOYW1lXCIpLnZhbCgpKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI3ZhbGlkYXRlX0RCTmFtZVwiKS5odG1sKFwi5LiN5Y+v5Li656m6XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghJChcIiNEQlB3ZFwiKS52YWwoKSkge1xyXG4gICAgICAgICAgICAgICAgJChcIiN2YWxpZGF0ZV9EQlB3ZFwiKS5odG1sKFwi5LiN5Y+v5Li656m6XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghJChcIiNEQlNlcnZpY2VOYW1lXCIpLnZhbCgpKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI3ZhbGlkYXRlX0RCU2VydmljZU5hbWVcIikuaHRtbChcIuS4jeWPr+S4uuepulwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDplJnor6/kv6Hmga/mj5DnpLpcclxuICAgICAgICAgKiBAcGFyYW0gb2Jqc3RyXHJcbiAgICAgICAgICogQHBhcmFtIGVycm9ydGV4dFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNldEVycm9yQ2xhc3Mob2Jqc3RyOiBzdHJpbmcsIGVycm9ydGV4dDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICQoJyMnICsgb2Jqc3RyICsgJycpLmFkZENsYXNzKFwidmFsaWRhdGVfZXJyb3JcIikuaHRtbChlcnJvcnRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIOaYvuekuuW4ruWKqeS/oeaBr1xyXG4gICAgICAgICAqIEBwYXJhbSBvYmpcclxuICAgICAgICAgKiBAcGFyYW0gbXNnXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaGVscGRpc3BsYXkob2JqOiBzdHJpbmcsIG1zZz86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgaHRtbCA9ICcnO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9iaikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInNpdGVUeXBlXzBcIjpcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gXCLlhoXpg6jomZrmi5865b2T5YmN56uZ54K55LiL6Z2i55qE6Jma5ouf56uZ54K577yM5b2T6K6+572u5Li66Jma5ouf56uZ54K555qE5pe25YCZ77yM55So5oi35Y+v5Lul5Zyo5LiN5ZCM55qE56uZ54K55LmL6Ze06L+b6KGM5YiH5o2iXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwic2l0ZVR5cGVfMVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBcIuWklumDqOeJqeeQhu+8muS4jeaYr+WQjOS4gOS4quermeeCueeahFVSTCzlvZPkuKTkuKrns7vnu5/lkIzml7blrZjlnKjnmoTml7blgJnvvIzljZXngrnnmbvlvZXlkK/liqjkuYvlkI7vvIzlj6/ku6Xot6jlupPmk43kvZzvvIzkvovlpoLvvJrnmb7luqbnrYnnq5nngrlcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzeXNTaXRlXzBcIjpcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gXCLmmK/lkKbmmK/ns7vnu58sIOWQpu+8muW9k+WJjeermeeCueS4jeWcqOWvvOiIquS4iuaYvuekulwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInN5c1NpdGVfMVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBcIuaYr+WQpuaYr+ezu+e7nywg5piv77ya5b2T5YmN56uZ54K55Zyo5a+86Iiq5LiK5pi+56S6XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwic2l0ZURpc3BsYXlfMFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBcIuaYr+WQpuaYvuekuiwg5ZCm77ya6K+l57O757uf5Zyo56uZ54K55a+86Iiq5LiK5LiN5pi+56S6XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwic2l0ZURpc3BsYXlfMVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBcIuaYr+WQpuaYvuekuuS4uiwg5piv77ya6K+l57O757uf5Lya5Zyo56uZ54K55a+86Iiq5LiK5pi+56S6XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwic2l0ZUFub255bW91c18wXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbCA9IFwi5piv5ZCm5Yy/5ZCN6K6/6ZeuLCDmmK/vvJrnlKjmiLfkuI3pnIDopoHnmbvlvZXlsLHlj6/ku6Xorr/pl67or6Xnq5nngrlcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzaXRlQW5vbnltb3VzXzFcIjpcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gXCLmmK/lkKbljL/lkI3orr/pl64sIOWQpu+8mueUqOaIt+W/hemhu+eZu+W9leaJjeWPr+S7peiuv+mXruWIsOivpeermeeCuVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInNpdGVEZWZhdWx0XzBcIjpcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gXCLpu5jorqTnq5nngrksIOWQpu+8mueUqOaIt+esrOS4gOasoeeZu+W9leS4jeWPr+S7peiuv+mXruivpeermeeCuVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInNpdGVEZWZhdWx0XzFcIjpcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gXCLpu5jorqTnq5nngrksIOaYr++8mueUqOaIt+esrOS4gOasoeeZu+W9leWPr+S7peiuv+mXruWIsOivpeermeeCuVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInRoZW1lXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbCA9IFwi5Li76aKY6aOO5qC877yaXCIgKyBtc2cgKyBcIjxici8+5rOo77ya5aaC5p6c5b2T5YmN56uZ54K555qE5Li76aKY5oiW6aG15aS05Zu+54mH5LiN55Sf5pWI77yM5Yi35paw6aG16Z2i5ZCO6YeN6K+V44CCXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwic2l0ZUhlYWRcIjpcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gXCLpobXlpLTlm77niYcsIOivpeermeeCuemhteWktOS9v+eUqOmhteWktOWbvueJh+WPs+i+ueaYvuekuueahOWbvueJh+OAgjxici8+5rOo77ya5aaC5p6c5b2T5YmN56uZ54K555qE5Li76aKY5oiW6aG15aS05Zu+54mH5LiN55Sf5pWI77yM5Yi35paw6aG16Z2i5ZCO6YeN6K+V44CCXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwic2l0ZVVSTFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBcIui/m+WFpeermeeCuVVSTO+8mui+k+WFpeeJqeeQhlVSTOS4juWGhemDqOiZmuaLn1VSTCDkvovlpoLvvJpodHRwOiAvLzE5Mi4xNjguMC4xOTI6MTAxMC8gXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoXCIjaGVscFwiKS5odG1sKGh0bWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIOS/neWtmOermeeCuVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNhdmVTaXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja0Rpc3BsYXlOYW1lKCkgJiYgdGhpcy5jaGVja0VuTmFtZSgpICYmIHRoaXMuY2hlY2tVUkwoKSAmJiB0aGlzLmNoZWNrREJMaW5rKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2V0U2l0ZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25TdHIgPSB0aGlzLmNvbnZlcnRUb0pzb25TdHIodGhpcy5jdXJyZW50U2l0ZUluZm8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IHRoaXMuYWRkT3B0aW9uID8gJ2FkZCcgOiAndXBkYXRlJztcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoPEpRdWVyeUFqYXhTZXR0aW5ncz57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdGhpcy5TaXRlTWFuYWdlckhhbmRsZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdQb3N0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBvcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlOiBqc29uU3RyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhdGEudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBleGVjdXRlUmVzdWx0ID0gJC5wYXJzZUpTT04ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhlY3V0ZVJlc3VsdC5yZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRkT3B0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTaXRlSW5mby5JRCA9IGV4ZWN1dGVSZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPGFueT53aW5kb3cpLnBhcmVudC5lZGl0Q2FsbGJhY2sodGhpcy5jdXJyZW50U2l0ZUluZm8sIHRoaXMuYWRkT3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRPcHRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLkv53lrZjmiJDlip/jgIJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLkv53lrZjlpLHotKXjgIJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24gPT0gXCJ1cGRhdGVcIikgeyAvL+ermeeCuee8k+WtmOW5tuWPkeaTjeS9nOWkhOeQhu+8jOS/neWtmOWksei0peaXtumHjeaWsOWKoOi9veagkSAyMDEzLTEyLTI3IGxpdWRmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gd2luZG93LnBhcmVudC5kb2N1bWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5sb2NhdGlvbi5ocmVmID0gXCIvUG9ydGFsL1JmU29mdC5NYXBsZVRyLkRQUy9TaXRlL2h0bWwvU2l0ZU1hbmFnZS5odG1cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiAoanFYSFI6IEpRdWVyeVhIUiwgc3RhdHVzOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLmm7TmlrDnq5nngrnlpLHotKXvvIzljp/lm6DmmK/vvJpcIiArIG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLov57mjqXliLDmnI3liqHlmajlpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDliKDpmaTnq5nngrlcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2l0ZUlkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZGVsZXRlU2l0ZShzaXRlSWQ6c3RyaW5nKTpib29sZWFue1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0PVwiXCI7XHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgICQuYWpheCg8SlF1ZXJ5QWpheFNldHRpbmdzPntcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHRoaXMuU2l0ZU1hbmFnZXJIYW5kbGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnUG9zdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IFwiZGVsZXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVJZDogc2l0ZUlkXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhdGEudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXhlY3V0ZVJlc3VsdCA9ICQucGFyc2VKU09OKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhlY3V0ZVJlc3VsdC5yZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiAoanFYSFI6IEpRdWVyeVhIUiwgc3RhdHVzOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuWIoOmZpOWksei0pe+8jOWOn+WboOaYr++8mlwiICsgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLov57mjqXliLDmnI3liqHlmajlpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDojrflj5bpobXpnaLkuK3nmoTlgLxcclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKi9cclxuICAgICAgICBHZXRTaXRlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTaXRlSW5mby5Jc0RlZmF1bHQgPSAkKFwiI2RlZmF1bHRTaXRlXCIpLnZhbCgpID09PSAnMSc7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNpdGVJbmZvLkRpc3BsYXlOYW1lID0gJChcIiNzaXRlRGlzcGxheU5hbWVcIikudmFsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNpdGVJbmZvLk5hbWUgPSAkKFwiI3NpdGVOYW1lXCIpLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTaXRlSW5mby5JY29uVVJMID0gJCgnI2ltYWdlSWNvblVSTCcpLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTaXRlSW5mby5Jc1N5c1NpdGUgPSAkKFwiI3N5c1NpdGVcIikudmFsKCkgPT09ICcxJztcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2l0ZUluZm8uU2l0ZXR5cGUgPSBOdW1iZXIoJChcIiNzaXRlVHlwZVwiKS52YWwoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNpdGVJbmZvLklzRGlzcGxheSA9ICQoXCIjc2l0ZURpc3BsYXlcIikudmFsKCkgPT09ICcxJztcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2l0ZUluZm8uVVJMID0gJChcIiNzaXRlVVJMXCIpLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTaXRlSW5mby5UaGVtZSA9ICQoXCIjc2l0ZVRoZW1lXCIpLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTaXRlSW5mby5IZWFkZXJJbWFnZSA9ICQoXCIjaGVhZGVyaW1hZ2VcIikudmFsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNpdGVJbmZvLklzU3RhcnRVcFNpdGVPcmcgPSAoJChcIiNjaGJfb3JnXCIpWzBdIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFNpdGVJbmZvLklzU3RhcnRVcFNpdGVPcmcgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNpdGVJbmZvLlNpdGVPcmdOYW1lID0gJChcIiN0eHRfc2l0ZU9yZ1wiKS52YWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTaXRlSW5mby5TaXRlT3JnSUQgPSAkKFwiI2hpZF9zaXRlT3JnXCIpLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTaXRlSW5mby5Jc1N0YXJ0VXBTaXRlREIgPSAoJChcIiNjamJfZGJsaW5rXCIpWzBdIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIjtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2l0ZUluZm8uREJOYW1lID0gJChcIiNEQk5hbWVcIikudmFsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNpdGVJbmZvLkRCUHdkID0gJChcIiNEQlB3ZFwiKS52YWwoKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2l0ZUluZm8uREJTZXJ2aWNlTmFtZSA9ICQoXCIjREJTZXJ2aWNlTmFtZVwiKS52YWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDovazmjaLkuLpqc29uXHJcbiAgICAgICAgICogQHBhcmFtIHNpdGVcclxuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29udmVydFRvSnNvblN0cihzaXRlOiBTaXRlSW5mbykge1xyXG4gICAgICAgICAgICBsZXQganNvblN0ciA9ICd7JztcclxuICAgICAgICAgICAganNvblN0ciArPSAnXCJJRFwiOlwiJyArIHNpdGUuSUQgKyAnXCInO1xyXG4gICAgICAgICAgICBqc29uU3RyICs9ICcsXCJEaXNwbGF5TmFtZVwiOlwiJyArIHNpdGUuRGlzcGxheU5hbWUgKyAnXCInO1xyXG4gICAgICAgICAgICBqc29uU3RyICs9ICcsXCJOYW1lXCI6XCInICsgc2l0ZS5OYW1lICsgJ1wiJztcclxuICAgICAgICAgICAganNvblN0ciArPSAnLFwiU2l0ZUFkbWluXCI6XCInICsgc2l0ZS5TaXRlQWRtaW4gKyAnXCInO1xyXG4gICAgICAgICAgICBqc29uU3RyICs9ICcsXCJJc0RlZmF1bHRcIjpcIicgKyBzaXRlLklzRGVmYXVsdCArICdcIic7XHJcbiAgICAgICAgICAgIGpzb25TdHIgKz0gJyxcIkljb25VUkxcIjpcIicgKyBzaXRlLkljb25VUkwgKyAnXCInO1xyXG4gICAgICAgICAgICBqc29uU3RyICs9ICcsXCJQYXJlbnRTaXRlSWRcIjpcIicgKyBzaXRlLlBhcmVudFNpdGVJZCArICdcIic7XHJcbiAgICAgICAgICAgIGpzb25TdHIgKz0gJyxcIklzU3lzU2l0ZVwiOlwiJyArIHNpdGUuSXNTeXNTaXRlICsgJ1wiJztcclxuICAgICAgICAgICAganNvblN0ciArPSAnLFwiU2l0ZXR5cGVcIjpcIicgKyBzaXRlLlNpdGV0eXBlICsgJ1wiJztcclxuICAgICAgICAgICAganNvblN0ciArPSAnLFwiSXNEaXNwbGF5XCI6XCInICsgc2l0ZS5Jc0Rpc3BsYXkgKyAnXCInO1xyXG4gICAgICAgICAgICBqc29uU3RyICs9ICcsXCJVUkxcIjpcIicgKyBzaXRlLlVSTCArICdcIic7XHJcbiAgICAgICAgICAgIGpzb25TdHIgKz0gJyxcIlRoZW1lXCI6XCInICsgc2l0ZS5UaGVtZSArICdcIic7XHJcbiAgICAgICAgICAgIGpzb25TdHIgKz0gJyxcIkhlYWRlckltYWdlXCI6XCInICsgc2l0ZS5IZWFkZXJJbWFnZSArICdcIic7XHJcbiAgICAgICAgICAgIGpzb25TdHIgKz0gJyxcIklzU3RhcnRVcFNpdGVPcmdcIjpcIicgKyBzaXRlLklzU3RhcnRVcFNpdGVPcmcgKyAnXCInO1xyXG4gICAgICAgICAgICBpZiAoc2l0ZS5Jc1N0YXJ0VXBTaXRlT3JnKSB7IC8v5aaC5p6c5ZCv55So5LqG6YOo6Zeo6L+H5ruk77yM5YiZ5bCG6YOo6Zeo55qE5L+h5oGv5pu05paw5Yiw57yT5a2Y5LitXHJcbiAgICAgICAgICAgICAgICBqc29uU3RyICs9ICcsXCJTaXRlT3JnTmFtZVwiOlwiJyArIHNpdGUuU2l0ZU9yZ05hbWUgKyAnXCInO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGpzb25TdHIgKz0gJyxcIlNpdGVPcmdJRFwiOlwiJyArIHNpdGUuU2l0ZU9yZ0lEICsgJ1wiJztcclxuICAgICAgICAgICAganNvblN0ciArPSAnLFwiSXNTdGFydFVwU2l0ZURCXCI6XCInICsgc2l0ZS5Jc1N0YXJ0VXBTaXRlREIgKyAnXCInO1xyXG4gICAgICAgICAgICBqc29uU3RyICs9ICcsXCJEQk5hbWVcIjpcIicgKyBzaXRlLkRCTmFtZSArICdcIic7XHJcbiAgICAgICAgICAgIGpzb25TdHIgKz0gJyxcIkRCUHdkXCI6XCInICsgc2l0ZS5EQlB3ZCArICdcIic7XHJcbiAgICAgICAgICAgIGpzb25TdHIgKz0gJyxcIkRCU2VydmljZU5hbWVcIjpcIicgKyBzaXRlLkRCU2VydmljZU5hbWUgKyAnXCInO1xyXG4gICAgICAgICAgICBqc29uU3RyICs9ICd9JztcclxuICAgICAgICAgICAgcmV0dXJuIGpzb25TdHI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g6YCJ5oup56uZ54K56YOo6ZeoXHJcbiAgICAgICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBzZWxTaXRlT3JnKCkge1xyXG4gICAgICAgICAgICBsZXQgb2JqID0gbmV3IERpYWxvZ09iamVjdCgpO1xyXG4gICAgICAgICAgICBvYmouaXNNdXRpbEl0ZW1zID0gdHJ1ZTtcclxuICAgICAgICAgICAgb2JqLnR5cGUgPSAnT1JHJztcclxuICAgICAgICAgICAgb2JqLmlzU3RhcnR1cFNpdGVPcmdGaWx0cmF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBvYmouTmFtZUNvbnRyb2wgPSAkKCc8SU5QVVQ+JykudmFsKCQoJyN0eHRfc2l0ZU9yZycpLnZhbCgpKTtcclxuICAgICAgICAgICAgb2JqLklkQ29udHJvbCA9ICQoJzxJTlBVVD4nKS52YWwoJChcIiNoaWRfc2l0ZU9yZ1wiKS52YWwoKSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB7b3BlcmF0ZTogXCJcIiwgbmFtZXM6IFwiXCIsIGlkczogXCJcIn07IC8vVE9ETzpSZlNvZnQuTWFwbGVUci5EUFMuSHIub3BlbkRlcHRPclJvbGVEaWFsb2cob2JqKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5vcGVyYXRlID09ICdFWElUJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJyN0eHRfc2l0ZU9yZycpLnZhbChyZXN1bHQubmFtZXMpO1xyXG4gICAgICAgICAgICAkKFwiI2hpZF9zaXRlT3JnXCIpLnZhbChyZXN1bHQuaWRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDmmK/lkKblkK/nlKjpg6jpl6jov4fmu6Tpqozor4FcclxuICAgICAgICAgKiBAcGFyYW0gb2JqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2hhbmdlU2l0ZU9yZ1BhbmVsU3RhdGUob2JqOiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChvYmouY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgJChcIiNkaXZfc2l0ZU9yZ1wiKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2Rpdl9zaXRlT3JnXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKFwiI3R4dF9zaXRlT3JnXCIpLmh0bWwoJzxzcGFuIHN0eWxlPVwiY29sb3I6R3JheTtcIj7lpoLmnpzkuLrnqbrvvIznq5nngrnkuI3lkK/nlKjpg6jpl6jov4fmu6Q8L3NwYW4+Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g5piv5ZCm5L2/55So5pWw5o2u5bqT6aqM6K+BXHJcbiAgICAgICAgICogQHBhcmFtIG9ialxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNoYW5nZURCTGlua1BhbmVsU3RhdGUob2JqOiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChvYmouY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgJChcIiNkaXZfZGJMaW5rXCIpLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoXCIjZGl2X2RiTGlua1wiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDlvpfliLDlvZPliY3kurrlkZjorr/pl67nmoTnq5nngrlcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5vQ2FjaGVcclxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEN1cnJlbnRTaXRlKG5vQ2FjaGU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgbGV0IHNpdGU6IFNpdGVJbmZvO1xyXG4gICAgICAgICAgICBpZiAobm9DYWNoZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJldHVyblZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICQuYWpheCg8SlF1ZXJ5QWpheFNldHRpbmdzPntcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHRoaXMuU0lURV9SVU5USU1FX0hBTkRMRVIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnR2V0JyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ2N1cnJlbnRzaXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9DYWNoZTogTWF0aC5yYW5kb20oKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGRhdGEudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiAoanFYSFI6IEpRdWVyeVhIUiwgc3RhdHVzOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuiOt+WPluW9k+WJjeermeeCueWHuumUme+8jOWOn+WboOaYr1wiICsgbWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICQucGFyc2VKU09OKHJldHVyblZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdCA9PT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxTaXRlSW5mbz5yZXN1bHQuc2l0ZTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiDojrflj5blhajlsYB0b3AuZ19TaXRlXHJcbiAgICAgICAgICAgICAgICAgICAgLyogICAgICAgICAgICBpZiAodG9wLmdfU2l0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlID0gdG9wLmdfU2l0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUgPSBDdXJyZW50U2l0ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgICAgICAgICBzaXRlID0gdGhpcy5DdXJyZW50U2l0ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/ot6jln5/osIPnlKjml6DmnYPpmZAg6YeN5paw6K+35rGC5pyN5Yqh5ZmoXHJcbiAgICAgICAgICAgICAgICAgICAgc2l0ZSA9IHRoaXMuQ3VycmVudFNpdGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNpdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g6I635Y+W57O757uf6buY6K6k56uZ54K5XHJcbiAgICAgICAgICogQHJldHVybnMge2FueX1cclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKi9cclxuICAgICAgICBEZWZhdWx0U2l0ZSgpIHtcclxuICAgICAgICAgICAgbGV0IHNlbmRYbWwgPSBcIjxFeGVjdXRlIG9wdGlvbj0nZ2V0ZGVmYXVsdHNpdGUnLz5cIjtcclxuICAgICAgICAgICAgbGV0IHJldHVyblZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgJC5hamF4KDxKUXVlcnlBamF4U2V0dGluZ3M+e1xyXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLlNJVEVfUlVOVElNRV9IQU5ETEVSLFxyXG4gICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ0dldCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAnZ2V0ZGVmYXVsdHNpdGUnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gZGF0YS50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiAoanFYSFI6IEpRdWVyeVhIUiwgc3RhdHVzOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi6I635Y+W6buY6K6k56uZ54K55Ye66ZSZ77yM5Y6f5Zug77yaXCIgKyBtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gJC5wYXJzZUpTT04ocmV0dXJuVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHQgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RPRE86IOi3s+i9rOeZu+W9lSBSZlNvZnQuTWFwbGVUci5EUFMuU2VjdXJpdHkuZ290b0xvZ2luKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5wYXJzZUpTT04ocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIOagueaNruermeeCuWlk6I635Y+W56uZ54K5XHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHNpdGVJZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR2V0U2l0ZUJ5SWQoc2l0ZUlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgbGV0IHJldHVyblZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgJC5hamF4KDxKUXVlcnlBamF4U2V0dGluZ3M+e1xyXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLlNJVEVfUlVOVElNRV9IQU5ETEVSLFxyXG4gICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ0dldCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAnZ2V0c2l0ZWJ5aWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNpdGVJZDogc2l0ZUlkXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gZGF0YS50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiAoanFYSFI6IEpRdWVyeVhIUiwgc3RhdHVzOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi5qC55o2uaWTojrflj5bnq5nngrnlpLHotKXvvIzljp/lm6DmmK/vvJpcIiArIG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICQucGFyc2VKU09OKHJldHVyblZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmVzdWx0ID09PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkLnBhcnNlSlNPTihyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g5qC55o2u5Lq65ZGYaWTojrflj5bpu5jorqTnq5nngrlcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklkXHJcbiAgICAgICAgICogQHJldHVybnMge2FueX1cclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKi9cclxuICAgICAgICBHZXREZWZhdWx0U2l0ZUJ5VXNlcklkKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICQuYWpheCg8SlF1ZXJ5QWpheFNldHRpbmdzPntcclxuICAgICAgICAgICAgICAgIHVybDogdGhpcy5TSVRFX1JVTlRJTUVfSEFORExFUixcclxuICAgICAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdHZXQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ2dldHVzZXJkZWZhdWx0c2l0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB1c2VySWRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBkYXRhLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IChqcVhIUjogSlF1ZXJ5WEhSLCBzdGF0dXM6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLojrflj5bnlKjmiLfpu5jorqTnq5nngrnlpLHotKXvvIzljp/lm6DmmK/vvJpcIiArIG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICQucGFyc2VKU09OKHJldHVyblZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmVzdWx0ID09PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkLnBhcnNlSlNPTihyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24g5qC55o2udXJs6I635Y+W56uZ54K5aWRcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXHJcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKi9cclxuICAgICAgICBHZXRTaXRlSWRCeVVSTCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICQuYWpheCg8SlF1ZXJ5QWpheFNldHRpbmdzPntcclxuICAgICAgICAgICAgICAgIHVybDogdGhpcy5TSVRFX1JVTlRJTUVfSEFORExFUixcclxuICAgICAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdHZXQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ2dldHNpdGVpZGJ5dXJsJyxcclxuICAgICAgICAgICAgICAgICAgICBzaXRlVXJsOiB1cmxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBkYXRhLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IChqcVhIUjogSlF1ZXJ5WEhSLCBzdGF0dXM6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLojrflj5bnq5nngrlpZOWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSAkLnBhcnNlSlNPTihyZXR1cm5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdCA9PT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5wYXJzZUpTT04ocmVzdWx0LmRhdGEpLnNpdGVJZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDmoLnmja51c2VySWTojrflj5bkurrlkZjmnInmnYPpmZDnmoTnq5nngrnpm4blkIhcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklkXHJcbiAgICAgICAgICogQHJldHVybnMge2FueX1cclxuICAgICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICAgKi9cclxuICAgICAgICBHZXRTaXRlc0J5VXNlcih1c2VySWQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBsZXQgcmV0dXJuVmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAkLmFqYXgoPEpRdWVyeUFqYXhTZXR0aW5ncz57XHJcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuU0lURV9SVU5USU1FX0hBTkRMRVIsXHJcbiAgICAgICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnR2V0JyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICdnZXRzaXRlc2J5dXNlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB1c2VySWRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBkYXRhLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IChqcVhIUjogSlF1ZXJ5WEhSLCBzdGF0dXM6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLmoLnmja7ojrflj5bnq5nngrnlpLHotKVcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gJC5wYXJzZUpTT04ocmV0dXJuVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHQgPT09IHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQucGFyc2VKU09OKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiDojrflj5bkuI3lkIznmoTnq5nngrnmoJHpm4blkIhcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gb2JqSWRcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR2V0U2l0ZXNCeVR5cGUob2JqSWQ6IHN0cmluZywgdHlwZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICQuYWpheCg8SlF1ZXJ5QWpheFNldHRpbmdzPntcclxuICAgICAgICAgICAgICAgIHVybDogdGhpcy5TSVRFX1JVTlRJTUVfSEFORExFUixcclxuICAgICAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdHZXQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ2dldHNpdGVzYnl0eXBlJyxcclxuICAgICAgICAgICAgICAgICAgICBvYmpJZDogb2JqSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGRhdGEudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogKGpxWEhSOiBKUXVlcnlYSFIsIHN0YXR1czogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIuagueaNruiOt+WPluermeeCueWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSAkLnBhcnNlSlNPTihyZXR1cm5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdCA9PT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5wYXJzZUpTT04ocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJqcXVlcnkuZC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImtlbmRvLmFsbC5kLnRzXCIvPlxyXG5cclxuaW1wb3J0IHtSZlNvZnR9IGZyb20gXCIuL1JmU29mdC5NYXBsZVRyLkRQUy5TaXRlXCI7XHJcblxyXG5jbGFzcyBTaXRlU2VydmljZSB7XHJcbiAgICBzaXRlOiBSZlNvZnQuTWFwbGVUci5EUFMuU2l0ZTtcclxuICAgIHNpdGVUcmVlOiBrZW5kby51aS5UcmVlVmlldztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuc2l0ZSA9IG5ldyBSZlNvZnQuTWFwbGVUci5EUFMuU2l0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEluaXQodHJlZUNvbnRhaW5lcklkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLkluaXRUcmVlKHRyZWVDb250YWluZXJJZCk7XHJcbiAgICAgICAgdGhpcy5zaXRlLmluaXRDb250ZW50UGFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOWIneWni+WMluermeeCueagkVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRhaW5lcklkXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgSW5pdFRyZWUoY29udGFpbmVySWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBkYXRhID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJRDogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICBOYW1lOiBcIuermeeCueagueiKgueCuVwiLFxyXG4gICAgICAgICAgICAgICAgQ2hpbGRTaXRlczpcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkRTMTUxNzMyODQyMzg0NDA1MDYwMDA1OTlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5hbWU6IFwiTWFwbGVUUl9TSFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogXCJEUzE1MTczMjgzOTMwOTA4NTA0MDAwNDI5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOYW1lOiBcIk1hcGxlVFJf5Li76Zeo5oi3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkRTMTUxNzMyODQxMzU5NDg1MDYwMDA1MTRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5hbWU6IFwiTWFwbGVUUl9HRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogXCJEUzE1MDM2NTYyMDA1NzkyOTM3MDAwMDAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOYW1lOiBcIk1hcGxlVFJfWlpMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkRTMTMwNzMwMDYwNDE0MDAwMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmFtZTogXCLnq5nngrnkuLvpobVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgLy/mnoTlu7rmtYHnqIvliIbnsbvmoJFcclxuICAgICAgICBsZXQgZGF0YVNvdXJjZSA9IG5ldyBrZW5kby5kYXRhLkhpZXJhcmNoaWNhbERhdGFTb3VyY2Uoe1xyXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgICAgIG1vZGVsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiSURcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogXCJDaGlsZFNpdGVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzaXRlU2VydmljZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5zaXRlVHJlZSA9IG5ldyBrZW5kby51aS5UcmVlVmlldygkKFwiI1wiICsgY29udGFpbmVySWQpWzBdLCB7XHJcbiAgICAgICAgICAgIGNoZWNrYm94ZXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBkYXRhU291cmNlOiBkYXRhU291cmNlLFxyXG4gICAgICAgICAgICBkYXRhVGV4dEZpZWxkOiBcIk5hbWVcIixcclxuICAgICAgICAgICAvKiBzZWxlY3QoZSkgey8v6YCJ5Lit5pe25qC55o2uaWTliqDovb3nq5nngrnor6bmg4VcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGUubm9kZS5pZCk7XHJcbiAgICAgICAgICAgICAgICBlLm5vZGUuaWQ7XHJcbiAgICAgICAgICAgICAgICBzaXRlU2VydmljZS5zaXRlLmJpbmRTaXRlKGUubm9kZS5pZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9LCovXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDmt7vliqDnq5nngrlcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBBZGRTaXRlKCkge1xyXG4gICAgICAgIHRoaXMuc2l0ZS5iaW5kU2l0ZShcIjBcIiwgdHJ1ZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliKDpmaTnq5nngrlcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBEZWxldGVTaXRlKCkge1xyXG4gICAgICAgIC8v6I635Y+W5qCR55qE6YCJ5Lit6IqC54K5XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnNpdGVUcmVlLnNlbGVjdCgpO1xyXG4gICAgICAgIGxldCBpZCA9IFwiXCI7XHJcbiAgICAgICAgaWYgKG5vZGUubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLmsqHmnInpgInmi6nku7vkvZXnq5nngrlcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlkID0gdGhpcy5zaXRlVHJlZS5kYXRhSXRlbShub2RlKS5pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbmZpcm0oXCLnoa7lrpropoHliKDpmaTlkJfvvJ9cIikpIHtcclxuICAgICAgICAgICAgLy/miafooYzliKDpmaRcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuc2l0ZS5kZWxldGVTaXRlKGlkKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLliKDpmaTmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAvL+WIt+aWsOagkVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXRlVHJlZS5kYXRhU291cmNlLnJlYWQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi5Yig6Zmk5aSx6LSlXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpdGVNYW5hZ2Uge1xyXG4gICAgSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2l0ZSA9IG5ldyBTaXRlU2VydmljZSgpO1xyXG4gICAgICAgIHNpdGUuSW5pdChcImRpdkluaXRUcmVlXCIpO1xyXG4gICAgfVxyXG59XHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgcnMgPSBuZXcgU2l0ZU1hbmFnZSgpO1xyXG4gICAgcnMuSW5pdCgpO1xyXG59KTtcclxuIl19
