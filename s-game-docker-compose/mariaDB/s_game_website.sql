/*
 Navicat Premium Data Transfer

 Source Server         : 个人腾讯云
 Source Server Type    : MariaDB
 Source Server Version : 100504
 Source Host           : localhost:3310
 Source Schema         : s_game_website

 Target Server Type    : MariaDB
 Target Server Version : 100504
 File Encoding         : 65001

 Date: 03/02/2021 16:52:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity_type
-- ----------------------------
DROP TABLE IF EXISTS `activity_type`;
CREATE TABLE `activity_type`  (
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '当前开启活动弹窗类型',
  `activity_type` int(11) NULL DEFAULT 0,
  `activity_name` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  `delete_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE INDEX `activity_type`(`activity_type`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity_type
-- ----------------------------
INSERT INTO `activity_type` VALUES ('当前开启活动弹窗类型', 0, '无活动*农历新年活动', '2020-02-16 15:36:44', '2020-03-13 09:55:09', NULL);

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `main_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `child_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `article_describe` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `cover_image_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `head_bg_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `head_media_url` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `head_media_param` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `keywords` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `hitcount` int(11) NULL DEFAULT NULL,
  `likecount` int(11) NULL DEFAULT NULL,
  `commentcount` int(11) NULL DEFAULT NULL,
  `author` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `show_type` int(11) NULL DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  `delete_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, 'about', NULL, '关于我们', '', NULL, '', NULL, NULL, NULL, '<!DOCTYPE html>\r\n<html>\r\n<head>\r\n</head>\r\n<body>\r\n<h2>一、网站介绍</h2>\r\n<hr />\r\n<p>&nbsp; &nbsp; 本网站是独立游戏StellarBug的官方网站。</p>\r\n<p>&nbsp; &nbsp; StellarBug(中文名《星虫》)（暂定）是一个基于Unity2D开发的像素风格的俯视角星际探索类沙盒游戏。</p>\r\n<p>&nbsp; &nbsp; 游戏正处于早期开发阶段，目前仅我一人用爱发电独立制作中。。。若开发者对合作开发此游戏感兴趣，可通过邮箱526046576@qq.com联系我洽谈合作事宜；若玩家对游玩此游戏感兴趣，可关注收藏此网站，实时获取游戏开发动态，在评论区分享你的想法，并在不远的将来第一时间获取最新体验Demo。我将在网站上不定期分享游戏开发日志、技术文章、开源代码以及好玩的东西，欢迎大家常来看看o(&cap;_&cap;)o</p>\r\n<h2>二、常见问题</h2>\r\n<hr />\r\n<p>1.StellarBug(中文名《星虫》)的主要玩法是什么？</p>\r\n<p>&nbsp; &nbsp;&nbsp;&nbsp; 游戏中你将操控一架飞船在太空中探索、战斗、采集、建造。如果你对对独立游戏有一定涉猎，你可以把这个游戏当做远行星号+泰拉瑞亚的缝合怪。我是这类游戏的狂热粉丝，从一开始，这个游戏的设计方向就是从那些我觉得真正好玩的游戏中提炼要素，融合到自己的作品内。这或许不是灵光一现的天才想法，但是我希望通过不断加入新的有趣的玩法，来让这个游戏成为令人满意的作品</p>\r\n<p>2.游戏内有哪些独特而有趣的东西？</p>\r\n<p>&nbsp; &nbsp;&nbsp;&nbsp; 很多，有些功能花了大量的时间去实现，而且还需花费大量的时间去优化。比如可完全自由的制造飞船，你可以自定义飞船的外形和武器，你甚至可以自定义飞船输出幅能颜色，推进器、激光武器、能量护盾的颜色都会相应改变；多样的武器装备，激光、实弹、无人机、导弹、护盾，以及能带来诸如闪现等特殊能力的装备；丰富的建造物品，你完全可以建造自己想要的太空基地</p>\r\n<p>3.现在可以体验游戏吗？</p>\r\n<p>&nbsp; &nbsp;&nbsp;&nbsp; 游戏还处于开发阶段，目前暂不提供体验demo,你可以查看网站内的开发日志和录制的测试视频来进一步了解游戏。</p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;</p>\r\n</body>\r\n</html>', 1, 1, 0, '测试', 0, '2020-03-03 11:24:00', '2020-03-12 16:27:29', NULL);
INSERT INTO `article` VALUES (2, 'privacy', NULL, '隐私政策', '', NULL, '', NULL, NULL, NULL, '<!DOCTYPE html>\r\n<html>\r\n<head>\r\n</head>\r\n<body>\r\n<h2>1、本网站所收集的个人信息</h2>\r\n<p>本网站会根据合法、正当、必要的原则，仅收集用户实现产品功能所必需的个人信息。</p>\r\n<h3>1.1</h3>\r\n<p>用户主动提供信息：用户在使用本网站服务时主动提供/上传的信息，如用户评论时时填写的代称、邮箱等；</p>\r\n<h3>1.2</h3>\r\n<p>通过与本网站站方联络时提供的信息：如提交在线反馈时，提供的用户昵称、邮箱等信息。我们的部分服务或活动可能需要用户提供特定的个人敏感信息来实现特定功能。若用户选择不提供该类信息，则有可能无法使用服务或参加活动。</p>\r\n<h3>1.3</h3>\r\n<p>目前，除法律法规、法律程序、诉讼或政府主管部门强制性要求外，本网站不会主动公开披露用户的个人信息，如果存在其他需要公开披露个人信息的情形，我们会征得用户的明示同意。同时，我们保证披露采取符合法律和业界标准的安全防护措施。</p>\r\n<p>若用户主动提供用户的个人敏感信息，即表示用户同意我们按本政策所述目的和方式来处理用户的个人敏感信息。</p>\r\n<h2>2、本网站如何使用收集的信息</h2>\r\n<p>本网站严格遵守法律法规的规定及与用户的约定，将收集的信息用于以下用途。若本网站超出以下用途使用用户的信息，将再次进行说明并征求用户同意：</p>\r\n<h3>2.1 向用户提供本网站站内的服务；</h3>\r\n<h3>2.2 满足用户的个性化需求如语言设定、位置设定、个性化的帮助服务。；</h3>\r\n<h3>2.3 产品开发和服务优化，如有关产品的使用体验访问，软件认证、软件升级等；</h3>\r\n<h3>2.4 邀请用户参与有关本网站提供服务的调查。</h3>\r\n<h2>3、本网站使用Cookie的方式与目的</h2>\r\n<p>当用户使用本网站的服务时，会在用户的计算机或移动设备上存储名为 Cookie 的小数据文件；</p>\r\n<p>Cookie 通常包含标识符、站点名称以及一些号码和字符，我们使用它来判断注册用户是否已经登录，提升服务/产品质量及优化用户体验；</p>\r\n<p>如用户不希望个人信息保存在 Cookie 中，可通过配置浏览器选择禁用Cookie，这一行为可能影响本网站提供给用户的服务；</p>\r\n<p>本网站不会将获得的Cookie提供给其他机构，或用于本条所描述的目的之外的用途（国家法律法规及政策强制规定的除外）。</p>\r\n<h2>4、本网站移动端对设备权限的调用</h2>\r\n<p>在提供移动端服务的过程中，本网站可能需要用户开通如通知、相册、相机、定位等移动端设备的相关功能访问权限；</p>\r\n<p>用户可通过设备的设置功能选择关闭部分或全部权限，从而拒绝本网站收集对应的个人信息。</p>\r\n<h2>5、本网站对个人信息的保护与存储</h2>\r\n<p>本网站重视个人信息的安全，将采取一切合理可行的措施，确保未收集与本网站提供服务无关的个人信息；</p>\r\n<p>本网站将采用互联网业内标准做法对用户个人信息进行保护，防止信息被披露、使用、修改、损坏或丢失；</p>\r\n<p>在发生个人信息安全事件的场合，我们将根据法律法规的要求，尽快通过能够掌握的渠道，向用户告知：事件情况、补救措施、处置措施、用户自主防范与降低风险的方式方法等，并采取合理有效的方式对用户发布公告。</p>\r\n<p>本网站在中华人民共和国境内收集和产生的个人信息将存储在中华人民共和国境内。如果日后为处理跨境业务，需要向境外机构传输境内收集的相关个人信息的，本网站会事先征得用户的同意，按照法律、行政法规和相关监管部门的规定执行，并通过签订协议、核查等有效措施，要求境外机构为所获得的个人信息保密。</p>\r\n<h2>6、未成年人保护</h2>\r\n<p>本网站重视对未成年人个人信息的保护，根据相关法律法规的规定，若用户是18周岁以下的未成年人，在使用本网站的服务前，应事先取得用户的家长或法定监护人的同意。</p>\r\n<h2>7、本网站隐私政策的更新与使用范围</h2>\r\n<p>本网站将根据服务类型的扩展和产品的更新迭代，不定期更新和修改本声明。</p>\r\n<p>如修改造成用户权利的减少，本网站将通过不同渠道通知用户，包括但不限于网站公示、私信通知等方式。</p>\r\n<p>如用户不同意修改后的隐私声明，则有权并立即停止使用本网站提供的服务，如果用户继续使用本网站的服务，则视为用户接受本网站对本政策相关条款所做的修改。</p>\r\n</body>\r\n</html>', 11, 11, 0, 'ricky2333', 0, '2018-03-03 11:25:00', '2018-03-03 11:25:00', NULL);
INSERT INTO `article` VALUES (3, 'terms', NULL, '用户协议', '', NULL, '', NULL, NULL, NULL, '<!DOCTYPE html>\r\n<html>\r\n<head>\r\n</head>\r\n<body>\r\n<p>欢迎来到本网站，请仔细阅读以下协议内容。</p>\r\n<p>当你（用户）在浏览本网站时，无论是使用本网站的各项服务，还是在本网站上发布任何内容，均意味着你已了解并完全接受本协议的各项内容，以及本网站对使用协议所作出的任何修改。</p>\r\n<p>如果您对本协议的任何条款表示异议，您可以选择不使用本网站。</p>\r\n<h2>1、接受条款</h2>\r\n<h3>1.1</h3>\r\n<p>本网站网的运营者与其相关关联公司（以下简称&ldquo;本网站&rdquo;），将根据本使用协议的条款及后续的补正和修改内容，为你提供基于本网站网（包括本网站web端、iOS/Android相关客户端、移动网页端等）的互联网服务。</p>\r\n<p>本协议的条款可由本网站随时修改，修改后的使用协议在网站上公布的同时即生效并替代原有的协议。</p>\r\n<p>你在本网站网注册账号后，即成为本网站用户（以下简称&ldquo;用户&rdquo;/&ldquo;你&rdquo;），并受到本协议的约束。</p>\r\n<h3>1.2</h3>\r\n<p>用户应遵守本协议的各项条款，合法合理地使用本网站提供的服务。否则，本网站有权依据本协议中断或停止为你提供相应服务。同时，本网站保留在任何时间段收回用户账号的权利。</p>\r\n<h3>1.3</h3>\r\n<p>用户直接或通过各类方式间接使用本网站服务（如RSS源、站外引用、第三方平台发布）数据的行为，均将被视作已无条件接受本协议全部内容，否则请立即停止使用本网站提供的全部服务。</p>\r\n<h2>2、服务说明</h2>\r\n<h3>2.1</h3>\r\n<p>本网站向用户提供的服务包括但不限于下列内容：发布有关游戏、电影、书籍、音乐、图书、二次元、生活体验等领域的文章、评论、音频、视频；在本网站收藏有关上述内容的文章与评论等；。除非本协议有其他单独的明示规定，否则本网站强化目前服务的任何功能，或增加任何新功能（包括所推出的新产品），均受到本使用协议的规范。</p>\r\n<h3>2.2</h3>\r\n<p>用户应了解并同意本网站有权制订关于使用本服务的一般措施及限制。除上述提及服务内容之外，用户通过本服务发布或传送的任何信息、通讯资料与其他内容，如被删除或未储存及产生其他问题，应同意本网站无须承担任何责任；同时，本网站对于任何用户信息或个性化设定的时效、删除、传输错误、未储存或其他任意问题均不承担任何责任。</p>\r\n<h3>2.3</h3>\r\n<p>用户承诺不得以任何方式利用本网站直接或间接从事违反中国法律以及社会公德的行为，本网站有权对违反上述承诺的内容予以删除。用户不得利用本网站服务制作、上载、复制、发布、传播或者转载如下内容：</p>\r\n<p>◦ 反对宪法所确定的基本原则的；</p>\r\n<p>◦ 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>\r\n<p>◦ 损害国家荣誉和利益的；</p>\r\n<p>◦ 煽动民族仇恨、民族歧视，破坏民族团结的；</p>\r\n<p>◦ 侮辱、滥用英烈形象，否定英烈事迹，美化粉饰侵略战争行为的；</p>\r\n<p>◦ 破坏国家宗教政策，宣扬邪教和封建迷信的；</p>\r\n<p>◦ 散布谣言，扰乱社会秩序，破坏社会稳定的；</p>\r\n<p>◦ 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>\r\n<p>◦ 侮辱或者诽谤他人，侵害他人合法权益的；</p>\r\n<p>◦ 含有法律、行政法规禁止的其他内容的信息。</p>\r\n<h2>3、用户个人信息保护</h2>\r\n<h3>3.1</h3>\r\n<p>用户提供给本网站的注册资料，及本网站保留的有关用户的其他资料，将受到中国有关法律的保护。本网站将根据中国法律法规及本协议中的约定，收集、存储和使用你的个人信息。</p>\r\n<h3>3.2</h3>\r\n<p>当本网站提供正常服务时，用户可随时浏览、修改在本网站上的个人信息与资料，但可能无法修改注册时提供的部分初始信息与其他验证信息。</p>\r\n<h2>4、用户行为认定</h2>\r\n<h3>4.1</h3>\r\n<p>用户应遵守中华人民共和国相关法律法规，并同意对以任何方式使用用户的登录账号而使用本服务的任何行为及其结果承担全部责任。如你的行为违反国家法律，你将依法承担全部法律责任；如涉嫌构成犯罪，司法机关将追究你的刑事责任，本网站网将严格按照法律规定的义务及司法机关的要求进行配合。</p>\r\n<h3>4.2</h3>\r\n<p>如果本网站有理由认为用户的任何行为，包括但不限于你的任何言论或其它行为违反或可能违反国家法律法规的任何规定，本网站可在任何时候不经任何事先通知终止向你提供服务。</p>\r\n<h2>5、知识产权</h2>\r\n<p>用户可以在本网站获取、分享与传播信息。作为平台，本网站尊重并鼓励用户创作内容，同时亦承诺将保护知识产权作为本网站运营的基本原则之一。</p>\r\n<h3>5.1</h3>\r\n<p>本网站在本服务协议中，涉及提供的内容（包括但不限于网页、界面设计、版面框架、文字、音频、视频、图片或其他资料等）等知识产权归本网站或相关权利人所有。</p>\r\n<h3>5.2</h3>\r\n<p>除另有约定外，本网站提供服务时所依托的软件、系统等的著作权、专利权及其他知识产权归本网站所有。</p>\r\n<h3>5.3</h3>\r\n<p>本网站网、本网站以及其他本网站标识及产品、服务名称，均为本网站之商标。未经本网站事先书面同意，你不得擅自删除、掩盖或更改本网站的版权声明、商标或其它权利声明，上述内容均不得在任何平台被直接或间接发布、使用、出于发布或使用目的的改写或再发行，或被用于其他任何商业目的。</p>\r\n<h3>5.4</h3>\r\n<p>用户在本网站上传或发布的内容，应保证为其著作权人或已取得合法授权，且该内容不会侵犯任何第三方的合法权益。用户在本网站上发表的全部原创内容（包括但不限于文章、视频与评论），其著作权均归用户本人所有，可授权第三方以任何方式使用，无须得到本网站的同意。</p>\r\n<h3>5.5</h3>\r\n<p>如第三方针对用户上传或发布的内容，提出关于著作权的异议，本网站有权根据实际情况，对相关内容进行修改、隐藏或删除，并有权追求用户的法律责任。因著作权异议给本网站或任何第三方造成损失的，用户应负责全额赔偿。</p>\r\n<h3>5.6</h3>\r\n<p>为促进高价值内容的分享与传播，用户在本网站上发表内容时，即视作已经授予本网站有关该内容的：免费的、不可撤销的、无期限限制的、可再许可或转让的、非独家的著作财产权使用许可。本网站有权将该内容的全部或部分，使用于本网站任何形态的产品与服务中，包括但不限于网站、已发表的应用、第三方内容渠道或其他互联网产品，以展示、推广及其他不为我国法律所禁止的方式方法。</p>\r\n<h3>5.7</h3>\r\n<p>第三方若出于非商业目的，将用户在本网站上发布的内容转载至本网站或其相关产品之外的地方，应在作品正文开头的显著位置注明原作者身份（或原作者在本网站上使用的账号名称），并提供原始链接，注明&ldquo;原发表于本网站网&rdquo;，并不得对作品进行修改演绎。如需对作品进行修改或用于商业目的，第三方应单独联系用户，获得授权并按照用户规定的方式对该内容进行使用。</p>\r\n<h3>5.8</h3>\r\n<p>当任何第三方侵犯了本网站用户相关权利时，用户同意授权给本网站根据具体情况，由本网站或指定代理人，代表本网站自身或用户对侵权方进行警告、投诉、发起行政执法、诉讼、申请仲裁、进行上诉或谈判和解，本网站无须再次向用户请求单独授权，以及在本网站认为必要的情况下，用户应参与共同维权。</p>\r\n<h3>5.9</h3>\r\n<p>本网站有权利但无义务对用户发布的内容进行审核，并有权根据相关现有证据，结合《著作权法》、《侵权责任法》及《信息网络传播权保护条例》等法律法规，及本网站出具的其他用户协议与条款，对侵权、违法信息进行处理。</p>\r\n<h2>6、免责声明</h2>\r\n<h3>6.1</h3>\r\n<p>本网站不对用户发布的文章及评论的正确性进行保证；用户在本网站所发表的内容仅表明其个人的立场与观点，并不代表本网站自身的立场与观点；作为内容发布者，用户需自行对发表内容负责，因发表内容所引发的一切纠纷，由用户自行承担全部法律及连带责任。</p>\r\n<h3>6.2</h3>\r\n<p>本网站不能保证所提供的服务一定能够满足用户的要求；不能保证服务不会中断；不能保证服务的及时性、安全性与准确性；不能保证经由本网站服务取得或购买的任何产品、资讯、服务或其他信息符合用户的期望。</p>\r\n<h3>6.3</h3>\r\n<p>因不可抗力或本网站不能控制的原因，造成的服务中断或其他缺陷，本网站不承担任何责任，但将尽力减少因此给用户造成的损失或影响。</p>\r\n<h2>7、协议修改及一般条款</h2>\r\n<h3>7.1</h3>\r\n<p>根据互联网发展及有关法律法规、规范性文件的变化，或因本网站业务发展所产生的需求，本网站有权对本协议的条款作出修改、调整与变更。一旦本协议的内容发生变动，本网站将在本网站网站上公布修改后的协议内容，该公布行为被视作本网站已经通知用户进行修改内容。除公布行为之外，本网站也可能采用电子邮件、私信或其他方式，提示用户协议条款的修改、服务变更或其他重要事项。如不同意本网站对本协议相关条款所做的修改，用户有权并应当立即中止使用本网站及本网站所提供的一切形式服务；如用户继续使用本网站，则视作用户接受本网站对本协议条款所进行的修改。</p>\r\n<h3>7.2</h3>\r\n<p>当用户同意本协议时，即视作用户已经了解互联网的无国界性，同意遵守用户所在国家或地区的有关网络行为与内容发布之法律法规，以及特别同意遵守有关从中国或你所在国家或地区使用互联网输出信息的所有适用法律法规。</p>\r\n<h3>7.3</h3>\r\n<p>如果用户在注册本网站并使用服务时处于未成年（以用户所在当地法律法规对&ldquo;未成年&rdquo;的法律定义为准）阶段，则应在法定监护人的陪同下仔细阅读本协议。用户及法定监护人应按照法律及本协议的规定，承担对应责任。</p>\r\n<h3>7.4</h3>\r\n<p>本协议及用户与本网站之关系，均适用中华人民共和国法律。你与本网站就服务、协议或其他有关事项发生的争议，应先行友好协商解决；如协商不成，则应提请本网站实际运营者所在地有管辖权的人民法院通过诉讼解决。</p>\r\n<h3>7.5</h3>\r\n<p>本协议之任何规定或条款，如因与中华人民共和国法律抵触而无效，其他规定及条款仍具备完整的效力；本网站未行使或执行本使用协议中的任何规定或条款中的权利，并不构成对其他规定或条款的权利的放弃。</p>\r\n</body>\r\n</html>', 111, 111, 0, 'ricky', 0, '2010-03-03 11:24:00', '2010-03-03 11:24:00', NULL);
INSERT INTO `article` VALUES (4, 'article', 'development-log', '《星虫》开发日志#1', '这是游戏首篇开发日志', 'https://cdn.ahyaya.net/images/article/cover_3.png', 'https://cdn.ahyaya.net/images/article/banner_3.jpg', NULL, NULL, NULL, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<h1><strong>写在前边的话</strong></h1>\n<hr />\n<p>&nbsp; &nbsp; 两年半前，当时我在游戏公司任职策划。彼时的国内游戏行业，每年市场增长率的喜人数字，隔壁公司月流水超千万的项目，热情的投资人，以及让人不时感到压力的房贷......所有这些汇成一股浪潮，就像总设计师曾说的：&ldquo;就感觉到快,有催人跑的意思&rdquo;，这股浪潮裹挟着我们这群想要在大城市扎根的年轻一代，拼命工作，冷静、理性的接受现实，对一些我们之前不屑一顾的，非常具有资本主义色彩的词趋之若鹜，&ldquo;次日留存&rdquo;、&ldquo;ARPU&rdquo;、&ldquo;IP&rdquo;......</p>\n<p>&nbsp; &nbsp; 一方面是因为我对成为程序员的无比向往，另一方面因为我的矫情和软弱，我逐渐感到所有这一切跟我最初加入这个行业追求的东西相去甚远，于是我决定辞职，自学c#，开始制作独立游戏。</p>\n<p>&nbsp; &nbsp; 这篇开发日志接下来的部分不会讨论国内游戏产业现状、未来之类的命题，我相信大家已经讨论的足够多了，我也并没有什么比别人更深刻的想法。但是我也不并认同\"存在即合理\"之类的说法，说到底，我当然觉得独立游戏比传奇页游要&ldquo;高级&rdquo;的多，我也觉得要想长久的呆在这个行业里，一定要做一些真正想做的东西。另外，现阶段我并不觉得自己在制作的这个游戏有多&ldquo;好&rdquo;，它离我想要实现的效果还相去甚远。</p>\n<p>&nbsp; &nbsp; 如果阅读这篇开发日志的人，有制作自己喜欢的游戏这种想法，请记住这个想法是非常自私、奢侈的，如果你有志于此，请确保尽量不给家人带来麻烦！</p>\n<p>&nbsp; &nbsp; 现阶段，我决定把正在制作的这个游戏的名字暂定为stellarbug,中文名《星虫》，如果你觉得自己擅长给游戏起名，想要提建议，请在评论区留言！<strong>&nbsp;</strong></p>\n<h1><strong>游戏介绍</strong></h1>\n<hr />\n<p>&nbsp; &nbsp; 星虫是一个基于Unity制作的，俯视角的，驾驶飞船战斗的太空沙盒游戏</p>\n<p>&nbsp; &nbsp; 如果你是我的世界，泰拉瑞亚，远行星号这类游戏的粉丝，相信也会对这个游戏产生兴趣。</p>\n<p>&nbsp; &nbsp; 当前版本下游戏主要有设计飞船，探索太空，战斗，采集建造这几方面的玩法，下面我会分别进行介绍，你也可以移步<a href=\"https://stellarbug.ahyaya.net/#/media?main_type=media\">这里</a>观看游戏demo演示视频</p>\n<h3>1. 设计飞船</h3>\n<p>&nbsp; &nbsp; 不知道这个游戏是否可归类为角色扮演游戏，玩家实际上扮演的是一个类似于飞船核心舱的装置，围绕这个核心舱，你可以自由设计飞船的外形、武器、装备，自定义飞船推进器和激光的颜色，同时也会提供多种可自由搭配组合的武器系统比如实弹、能量、激光、导弹、无人机等。</p>\n<p>&nbsp;&nbsp;<img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://cdn.ahyaya.net/images/article/demo_make_ship.gif\" alt=\"\" width=\"550\" height=\"307\" />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>\n<p style=\"text-align: center;\"><span style=\"color: #7e8c8d;\">&nbsp; &nbsp; 设计飞船</span></p>\n<p>&nbsp; &nbsp;飞船的设计图纸可以导出成文件，供其他玩家使用</p>\n<p>&nbsp;</p>\n<h3>2.探索太空，战斗</h3>\n<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://cdn.ahyaya.net/images/article/demo_fight.gif\" alt=\"\" width=\"550\" height=\"307\" /></p>\n<p style=\"text-align: center;\"><span style=\"color: #7e8c8d;\">在太空中战斗</span></p>\n<p>&nbsp; &nbsp; 在随机生成的太空探索区域，击败敌军飞船，探索废墟、遗迹，打捞失落的科技。目前仅能够随机生成小行星带，后续将加入更多样的环境</p>\n<h3>3.采集建造</h3>\n<p>&nbsp; &nbsp; 同任何一个生存类游戏一样，你可以在小行星带采集矿物和燃料，使用发电站、蓄电池、电线组建电网，利用电网给制造模块和防御炮塔供电，逐步扩建自己的太空基地</p>\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://cdn.ahyaya.net/images/article/demo_collect.gif\" alt=\"\" width=\"550\" height=\"307\" /></p>\n<p style=\"text-align: center;\"><span style=\"color: #7e8c8d;\">在小行星带采集矿物</span></p>\n<p style=\"text-align: center;\"><span style=\"color: #7e8c8d;\"><img src=\"https://cdn.ahyaya.net/images/article/demo_build_2.gif\" alt=\"\" width=\"550\" height=\"307\" /></span></p>\n<p style=\"text-align: center;\">&nbsp;</p>\n<p style=\"text-align: center;\"><span style=\"color: #7e8c8d;\">铺设电网和制造模块，生产道具</span></p>\n<h1><strong>后续版本计划</strong></h1>\n<hr />\n<p>&nbsp; &nbsp; &nbsp;由于项目已经开发了相当长一段时间，系统显得比较庞杂和混乱，现有的功能块无法很好地整合在一起，形成创建角色&rarr;生成地图&rarr;游戏首个场景内游玩，这样完整的游戏玩法流程。下一步我暂时不打算增加新的功能，而是对现有功能梳理，优化，整合，尽快形成首个可玩的Demo。</p>\n<p>要实现以上目标，有以下问题需要解决</p>\n<ol>\n<li>过于繁琐的飞船设计系统，需要简化</li>\n<li>大量需要替换的美术资源、特效、UI</li>\n<li>操作、战斗体验优化，bug修复</li>\n<li>帮助和教程功能，简化操作，明确指引信息，能让玩家快速理解和掌握游戏玩法内容</li>\n<li>优化首个场景随机生成机制，bug修复</li>\n</ol>\n<p>我将在后续版本继续按计划向达成目标努力，并且尽量每个月更新一篇开发日志记录游戏新的进展，欢迎大家多多关注~；</p>\n<p>如果对此游戏有什么好的建议意见，欢迎在评论区留言；</p>\n<p>如果有开发者想要参与此项目开发，请查看<a href=\"http://stellarbug.ahyaya.net/#/article/11?main_type=article\">招募贴</a>；</p>\n<p>如果有其他商业合作，请发送邮件到526046576@qq.com</p>\n</body>\n</html>', 0, 3, 0, 'ricky', 0, '2020-03-02 11:25:00', '2020-12-24 16:51:42', NULL);
INSERT INTO `article` VALUES (5, 'article', 'web', '本网站开源啦', '基于Vue和Koa,源码已上传GitHub,请自行取用', 'https://cdn.ahyaya.net/images/article/cover_1.png', 'https://cdn.ahyaya.net/images/article/banner_1.png', NULL, NULL, NULL, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<h1>简介</h1>\n<hr />\n<p>&nbsp; &nbsp; 本网站基于Vue+Koa框架开发，包含CMS系统，支持评论，文章，视音频媒体播放等功能。 基于lin-cms制作，开发文档可参考http://doc.cms.7yue.pro/。</p>\n<p>&nbsp; &nbsp; 前后端均使用JavaScript，适合入门以及全栈开发者学习和构建自己的博客、轻量web应用、门户网站等,有任何问题请在文章下留言。</p>\n<h1><strong>项目仓库</strong></h1>\n<hr />\n<p>GitHub：<a href=\"https://github.com/ricky23333/s-game-website\">https://github.com/ricky23333/s-game-website</a></p>\n<p>码云：<a href=\"https://gitee.com/ricky23333/s-game-website.git\">https://gitee.com/ricky23333/s-game-website</a></p>\n</body>\n</html>', 0, 0, 3, 'ricky', 0, '2020-04-13 17:00:58', '2020-04-27 12:52:25', NULL);
INSERT INTO `article` VALUES (6, 'article', 'web', '云服务器部署网站详细步骤（踩坑）', 'CentOS 7.6系统下部署', 'https://cdn.ahyaya.net/images/article/cover_2.png', 'https://cdn.ahyaya.net/images/article/banner_2.png', NULL, NULL, NULL, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<h1>购买和配置云服务器</h1>\n<hr />\n<p><strong>一、购买云服务器</strong></p>\n<p>各大云服务器提供商购买服务器首年有大幅度优惠，之后续费就基本是正常价格，根据实际需求自行斟酌选择</p>\n<p>香港服务器的域名不需要备案，但是国内访问速度较慢</p>\n<p><strong>二、服务器控制台配置</strong></p>\n<p>需要设置系统密码和安全组规则，比较简单不再赘述，常用端口如下：</p>\n<p>22 Xshell远程连接服务器端口</p>\n<p>80&nbsp; IP默认跳转端口</p>\n<p>443 https跳转端口</p>\n<p>3306 mysql数据库访问端口</p>\n<p>4000/8000/8001 分别是我部署网站的服务端、客户端、cms的端口，根据自己需要配置</p>\n<h1>安装/部署系统环境</h1>\n<hr />\n<p><strong>一、连接服务器</strong></p>\n<p>我使用的是XShell和XFtp,很简单，无坑，可参考这篇进行设置 <a href=\"https://blog.csdn.net/qq_15009739/article/details/87379905\">xshell 连接centos</a></p>\n<p><strong>二、安装mysql</strong></p>\n<p>参考这篇文章&nbsp; 一路进行到第40步&nbsp;<a href=\"https://blog.csdn.net/weixin_42266606/article/details/80879571\">CentOS7安装MySQL8.0图文教程</a></p>\n<p>可能会遇到的坑：</p>\n<p>1.安装前一定要把系统内mariadb 卸载干净，mysql文件夹删除干净</p>\n<p>2.执行启动mysql服务时可能报错，需要执行<code>yum install libaio</code>安装libaio</p>\n<p>3.mysql部署完毕后，并且防火墙和安全组开启3306端口，可以通过navicat远程连接服务器数据库，navicat建立远程连接时，常规页签内的配置不变，ssh页签打开并填写服务器IP，端口为22</p>\n<p><strong>三、安装node.js</strong></p>\n<p>注意node版本号要跟自己本地环境一样，我用的10.16.3</p>\n<p>1.下载Node.js安装包</p>\n<div class=\"code-block\">\n<pre id=\"codeblock-8zo-2bg-g1i\" class=\"pre codeblock\" data-spm-anchor-id=\"a2c4g.11186623.2.i6.187d6c82vutvFa\"><code class=\"hljs crmsh\">wget https://nodejs.org/dist/v10.16.3/<span class=\"hljs-keyword\">node</span><span class=\"hljs-title\">-v10.16.3</span>-linux-x64.tar.xz</code></pre>\n</div>\n<p>2.解压文件</p>\n<div class=\"code-block\">\n<pre id=\"codeblock-1kx-q0s-7cd\" class=\"pre codeblock\"><code class=\"hljs crmsh\">tar xvf <span class=\"hljs-keyword\">node</span><span class=\"hljs-title\">-v10.16.3</span>-linux-x64.tar.xz</code></pre>\n</div>\n<p>3.创建软链接，您就可以在任意目录下直接使用node和npm命令</p>\n<div class=\"code-block\">\n<pre id=\"codeblock-or6-4uz-0g6\" class=\"pre codeblock\"><code class=\"hljs crmsh\">ln -s /root/<span class=\"hljs-keyword\">node</span><span class=\"hljs-title\">-v10.16.3</span>-linux-x64/bin/<span class=\"hljs-keyword\">node</span> <span class=\"hljs-title\">/usr</span>/local/bin/<span class=\"hljs-keyword\">node</span>\n<span class=\"hljs-title\">ln</span> -s /root/<span class=\"hljs-keyword\">node</span><span class=\"hljs-title\">-v10.16.3</span>-linux-x64/bin/npm /usr/local/bin/npm</code></pre>\n</div>\n<p>4.查看node、npm版本</p>\n<div class=\"code-block\">\n<pre id=\"codeblock-wy9-9jx-9xx\" class=\"pre codeblock\"><code class=\"hljs crmsh\"><span class=\"hljs-keyword\">node</span> <span class=\"hljs-title\">-v</span>\n</code><code class=\"hljs crmsh\">npm -v</code></pre>\n</div>\n<p>5.安装cnpm</p>\n<p><code>npm install -g cnpm --registry=https://registry.npm.taobao.orgcnpm install -g pm2</code></p>\n<p>6.创建软链接，使cnpm命令全局有效</p>\n<p><code>ln -s /root/node-v10.16.3-linux-x64/bin/cnpm /usr/local/bin/cnpm</code></p>\n<p><strong>四、安装pm2</strong></p>\n<p>5.安装pm2</p>\n<p><code>cnpm install -g pm2</code></p>\n<p>6.创建软链接，使pm2命令全局有效</p>\n<p><code>ln -s /root/node-v10.16.3-linux-x64/bin/pm2 /usr/local/bin/pm2</code></p>\n<p><strong>五、安装zip/unzip</strong></p>\n<p><code>yum install zip unzip</code></p>\n<p><strong>六、安装nginx</strong></p>\n<p><strong>1.</strong><strong>安装相关组件</strong></p>\n<p>默认需要&nbsp;zlib、openssl&nbsp;和&nbsp;pcre&nbsp;依赖包，其他组件可以根据自己需要选择安装。输入如下命令：</p>\n<p><code>yum -y install gcc gcc-c++ zlib zlib-devel openssl openssl-devel pcre pcre-devel</code></p>\n<p><strong>2.编译安装Nginx</strong></p>\n<p><code> wget https://nginx.org/download/nginx-1.17.1.tar.gz &nbsp; </code></p>\n<p><code>tar zxf nginx-1.17.1.tar.gz </code></p>\n<p><code>cd nginx-1.17.1</code></p>\n<p><code> ./configure --with-http_ssl_module</code>&nbsp; &nbsp;</p>\n<p><code>make &amp;&amp; make install</code> &nbsp;</p>\n<p>启动Nginx</p>\n<p><code>/usr/local/nginx/sbin/nginx</code></p>\n<p>创建软连接</p>\n<p><code>ln -s /usr/local/nginx/sbin/nginx /usr/local/bin/nginx</code></p>\n<p><strong>六、防火墙配置</strong></p>\n<p>将安全组内开放端口全部加入防火墙配置</p>\n<div class=\"cmp-shell-comment\">#查看防火墙开放端口</div>\n<div class=\"cmp-shell-title\"><code>firewall-cmd --list-all</code></div>\n<div class=\"cmp-shell-comment\">#关闭防火墙</div>\n<div class=\"cmp-shell-title\"><code>systemctl stop firewalld.service</code></div>\n<div class=\"cmp-shell-comment\">#打开防火墙</div>\n<div class=\"cmp-shell-title\"><code>systemctl start firewalld.service</code></div>\n<div class=\"cmp-shell-comment\">#永久开放XXX端口</div>\n<div class=\"cmp-shell-title\"><code>firewall-cmd --zone=public --add-port=XXX/tcp --permanent</code></div>\n<div class=\"cmp-shell-comment\">#更新防火墙规则</div>\n<div class=\"cmp-shell-title\">firewall-cmd --reload</div>\n<h1>域名备案、解析</h1>\n<hr />\n<p><strong>一、域名备案</strong></p>\n<p>个人域名备案不能使用博客/论坛/企业名等，必须保证非营利性</p>\n<p><strong>二、域名解析</strong></p>\n<p>可在云服务器控制台配置，规则比较详细，无坑</p>\n<p><strong>三、SSL证书</strong></p>\n<p>阿里云可申请总共20个免费SSL证书，这里我申请了三个，分别用于网站服务端/客户端/CMS，绑定域名然后下载nginx类型的证书文件，放置到到服务器/usr/local/nginx/cong文件夹下。</p>\n<p><strong>四、nginx配置</strong></p>\n<p>打开服务器上配置文件</p>\n<p><code>cd /usr/local/nginx/cong</code></p>\n<p><code>vim nginx.conf</code></p>\n<p>修改server字段配置如下，最好使用CentOS内置文本修改器修改</p>\n<p><code>server {</code><br /><code>&nbsp; &nbsp; &nbsp; &nbsp; listen &nbsp; &nbsp; &nbsp; 8000;</code><br /><code>&nbsp; &nbsp; &nbsp; &nbsp; server_name stellarbug.ahyaya.net;</code></p>\n<p><code>&nbsp; &nbsp; &nbsp; &nbsp; location / {</code><br /><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; root /home/s-game/client/dist;</code><br /><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; index &nbsp;index.html index.htm;</code><br /><code>&nbsp; &nbsp; &nbsp; &nbsp; }</code><br /><code>&nbsp; &nbsp; }</code></p>\n<p><code>server {</code><br /><code>&nbsp; &nbsp; &nbsp; listen &nbsp; &nbsp; &nbsp; 8001;</code><br /><code>&nbsp; &nbsp; &nbsp; server_name cms.ahyaya.net;</code></p>\n<p><code>&nbsp; &nbsp; &nbsp; location / {</code><br /><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; root /home/s-game/cms/dist;</code><br /><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; index &nbsp;index.html index.htm;</code><br /><code>&nbsp; &nbsp; &nbsp; &nbsp; }</code><br /><code>&nbsp; &nbsp; }</code></p>\n<p><code>&nbsp;server {</code><br /><code>&nbsp; &nbsp; &nbsp; listen 80 default;</code><br /><code>&nbsp; &nbsp; &nbsp; listen 443 ssl;&nbsp;</code><br /><code>&nbsp; &nbsp; &nbsp; server_name &nbsp;stellarbug.ahyaya.net;&nbsp;</code><br /><code>&nbsp; &nbsp; &nbsp; ssl_certificate &nbsp;cert_client.pem;&nbsp;</code><br /><code>&nbsp; &nbsp; &nbsp; ssl_certificate_key &nbsp;cert_client.key;&nbsp;</code><br /><code>&nbsp; &nbsp; &nbsp; ssl_session_cache shared:SSL:1m;&nbsp;</code><br /><code>&nbsp; &nbsp; &nbsp; ssl_session_timeout &nbsp;5m;&nbsp;</code><br /><code>&nbsp; &nbsp; &nbsp; ssl_ciphers HIGH:!aNULL:!MD5;</code><br /><code>&nbsp; &nbsp; &nbsp; ssl_prefer_server_ciphers &nbsp;on;</code><br /><code>&nbsp; &nbsp; &nbsp; client_max_body_size &nbsp;10M;</code><br /><code>&nbsp;</code><br /><code>location / {&nbsp;</code><br /><code>&nbsp; &nbsp; &nbsp; proxy_pass &nbsp;http://127.0.0.1:8000;</code><br /><code>&nbsp; &nbsp; &nbsp; index index.html index.htm;</code><br /><code>&nbsp; &nbsp; }</code><br /><code>}</code></p>\n<p><code>server {</code><br /><code>&nbsp; &nbsp; listen 80;</code><br /><code>&nbsp; &nbsp; listen 443 ssl;</code><br /><code>&nbsp; &nbsp; server_name &nbsp;cms.ahyaya.net;</code><br /><code>&nbsp; &nbsp; ssl_certificate &nbsp;cert_cms.pem;</code><br /><code>&nbsp; &nbsp; ssl_certificate_key &nbsp;cert_cms.key;</code><br /><code>&nbsp; &nbsp; ssl_session_cache shared:SSL:1m;</code><br /><code>&nbsp; &nbsp; ssl_session_timeout &nbsp;5m;</code><br /><code>&nbsp; &nbsp; ssl_ciphers HIGH:!aNULL:!MD5;</code><br /><code>&nbsp; &nbsp; ssl_prefer_server_ciphers &nbsp;on;</code><br /><code>&nbsp; &nbsp; client_max_body_size &nbsp;1000M;</code></p>\n<p><code>&nbsp; &nbsp; location / {</code><br /><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; proxy_pass &nbsp;http://127.0.0.1:8001;</code><br /><code>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; index index.html index.htm;</code><br /><code>&nbsp; &nbsp; }</code><br /><code>}</code></p>\n<p><code>server {</code><br /><code>&nbsp; &nbsp; listen 80;</code><br /><code>&nbsp; &nbsp; listen 443 ssl;</code><br /><code>&nbsp; &nbsp; server_name &nbsp;server.ahyaya.net;</code><br /><code>&nbsp; &nbsp; ssl_certificate &nbsp;cert_server.pem;</code><br /><code>&nbsp; &nbsp; ssl_certificate_key &nbsp;cert_server.key;</code><br /><code>&nbsp; &nbsp; ssl_session_cache shared:SSL:1m;</code><br /><code>&nbsp; &nbsp; ssl_session_timeout &nbsp;5m;</code><br /><code>&nbsp; &nbsp; ssl_ciphers HIGH:!aNULL:!MD5;</code><br /><code>&nbsp; &nbsp; ssl_prefer_server_ciphers &nbsp;on;</code><br /><code>&nbsp; &nbsp; client_max_body_size &nbsp;10M;</code></p>\n<p><code>&nbsp; &nbsp; location / {</code><br /><code>&nbsp; &nbsp; &nbsp; &nbsp; proxy_pass &nbsp;http://127.0.0.1:4000;</code><br /><code>&nbsp; &nbsp; &nbsp; &nbsp; index index.html index.htm;</code><br /><code>&nbsp; &nbsp; }</code><br /><code>}</code></p>\n</body>\n</html>', 0, 0, 0, 'ricky', 0, '2020-04-13 17:21:47', '2020-04-24 08:40:38', NULL);
INSERT INTO `article` VALUES (7, 'article', 'web', '网站首次加载速度优化', 'vue框架网站优化', 'https://cdn.ahyaya.net/images/article/cover_1.png', 'https://cdn.ahyaya.net/images/article/banner_1.png', NULL, NULL, NULL, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<h1>问题分析</h1>\n<hr />\n<p>&nbsp; &nbsp; 网站打包上传服务器后，访问网站的首次载入时间为20秒左右，这个加载速度肯定是无法接受的，打开浏览器network,发现vendor.js和app.js的体积达到了数百K甚至1M，vendor.js主要包含了vue框架引入的如vue/vue-route/vuex等库，app.js则包含了路由组件，其他图片/音频等媒体文件也有超过100K的。因此，网站首次访问速度的优化，集中在对于这些体积大于100k的文件的优化处理。</p>\n<h1>解决方案</h1>\n<hr />\n<h4>1.路由组件懒加载</h4>\n<p>打开项目下router配置，默认情况，组件是通过如下方式引入的</p>\n<pre><code>import HomepageBody from \'../views/homepage/homepage-body.vue\';<br /></code><code>{</code><br /><code>  path: \'/homepage\',</code><br /><code>  name: \'首页\',</code><br /><code>  component: HomepageBody,</code><br /><code>},</code></pre>\n<p>这会导致所有路由组件打包到同一个app.js文件内，首次进入网站加载app.js过大，修改为如下方式，只有在进入对应页面时，才会懒加载对应组件，减小了单个app.js文件的大小，当然，这也会导致对应页面的加载速度略微变慢，以及增加请求次数</p>\n<p><code>{  path: \'/homepage\',</code><br /><code>  name: \'首页\',</code><br /><code>  component: resolve =&gt; (require([\'../views/homepage/homepage-body.vue\'], resolve)),</code><br /><code>},</code></p>\n<h4>2.加载CDN公共库</h4>\n<p>开发环境下，一般通过npm本地安装项目使用的公共库，这会显著增大打包后vendor.js的大小。为了减小vendor大小，可以通过引入CDN公共库加载所需要脚本。国内较有名的CDN公共库可自行搜索，一个问题是若CDN公共库不稳定，也会对自己网站造成影响，因此可考虑自己搭建CDN公共库服务器，这里使用<a href=\"https://cdn.bytedance.com/\">字节跳动的库</a></p>\n<p>在项目下index.html的&lt;body&gt;标签中添加如下字段引入常用公共库，注意vue的引入需要排在首位</p>\n<pre><code>&lt;link rel=\"stylesheet\" href=\"https://s0.pstatp.com/cdn/expire-1-M/element-ui/2.8.2/theme-chalk/index.css\"&gt;</code><br /><code>&lt;script src=\"https://s2.pstatp.com/cdn/expire-1-M/vue/2.5.2/vue.min.js\"&gt;&lt;/script&gt;</code><br /><code>&lt;script src=\"https://s2.pstatp.com/cdn/expire-1-M/vue-router/3.0.6/vue-router.min.js\"&gt;&lt;/script&gt;</code><br /><code>&lt;script src=\"https://s3.pstatp.com/cdn/expire-1-M/vuex/3.1.0/vuex.min.js\"&gt;&lt;/script&gt;</code><br /><code>&lt;script src=\"https://s3.pstatp.com/cdn/expire-1-M/axios/0.19.0-beta.1/axios.min.js\"&gt;&lt;/script&gt;</code><br /><code>&lt;script src=\"https://s1.pstatp.com/cdn/expire-1-M/element-ui/2.8.2/index.js\"&gt;&lt;/script&gt;</code></pre>\n<p>然后修改build文件夹下webpack.base.conf.js，在module.exports = {｝内添加如下字段</p>\n<p><code>externals: {</code><br /><code>  \"vue\": \"Vue\",</code><br /><code>  \"vue-router\": \"VueRouter\",</code><br /><code>  \"vuex\": \"Vuex\",</code><br /><code>  \'axios\': \'Axios\',</code><br /><code>  \"element-ui\": \"ELEMENT\",</code><br /><code>}<br /></code>之后，在项目中可直接通过import引入库并使用，不需要vue.use(XXX);</p>\n<h4>3.图片等媒体资源CDN加速</h4>\n<p>可以使用云服务器的CDN和对象存储，将项目内图片，音视频等媒体资源存放到云空间上，减少自身服务器的带宽消耗</p>\n<p>这里我选择了腾讯云，需要提供一个已经备案过的二级域名和该域名对应的SSL证书，并在云空间上配置自定义加速域名，开启cores跨域权限，之后可在自己网站直接引入资源Url使用</p>\n<h4>4.服务器nginx开启Gzip</h4>\n<p>使用xShell连接网站云服务器，打开/usr/local/nginx/conf，编辑nginx.conf，在http内添加如下字段开启gzip，开启后将消耗服务器性能，对请求的网站资源进行压缩，提高网站访问速度</p>\n<p><code>gzip on;</code><br /><code>gzip_min_length 1k;</code><br /><code>gzip_buffers 4 16k;</code><br /><code>#gzip_http_version 1.0;</code><br /><code>gzip_comp_level 2;</code><br /><code>gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;</code><br /><code>gzip_vary off;</code><br /><code>gzip_disable \"MSIE [1-6]\\.\";</code></p>\n<p>第1行：开启Gzip</p>\n<p>第2行：不压缩临界值，大于1K的才压缩，一般不用改</p>\n<p>第3行：buffer，就是，嗯，算了不解释了，不用改</p>\n<p>第4行：用了反向代理的话，末端通信是HTTP/1.0，有需求的应该也不用看我这科普文了；有这句的话注释了就行了，默认是HTTP/1.1</p>\n<p>第5行：压缩级别，1-10，数字越大压缩的越好，时间也越长，看心情随便改吧</p>\n<p>第6行：进行压缩的文件类型，缺啥补啥就行了，JavaScript有两种写法，最好都写上吧，总有人抱怨js文件没有压缩，其实多写一种格式application/javascript 就行了</p>\n<p>第7行：跟Squid等缓存服务有关，on的话会在Header里增加\"Vary: Accept-Encoding\"，我不需要这玩意，自己对照情况看着办吧</p>\n<p>第8行：IE6对Gzip不怎么友好，不给它Gzip了<br /><br /></p>\n<p>&nbsp;</p>\n</body>\n</html>', 0, 0, 0, NULL, 0, '2020-04-22 23:57:13', '2020-04-23 14:06:50', NULL);
INSERT INTO `article` VALUES (8, 'media', 'videos', '《星虫》demo战斗演示视频', NULL, 'https://cdn.ahyaya.net/images/article/cover_3.png', 'to left,rgba(115,104,118,1.0)0%,rgba(17,11,15,1.0)95%', 'https://cdn.ahyaya.net/videos/demo_fight.mp4', NULL, NULL, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>这是录制的《星虫》demo简单的战斗演示视频，《星虫》是一个太空沙盒射击游戏。</p>\n</body>\n</html>', 0, 0, 0, 'ricky', 0, '2020-04-24 16:59:23', '2020-04-24 17:23:36', NULL);
INSERT INTO `article` VALUES (9, 'media', 'videos', '《星虫》demo建造演示视频', NULL, 'https://cdn.ahyaya.net/images/article/cover_3.png', 'to left,rgba(115,104,118,1.0)0%,rgba(17,11,15,1.0)95%', 'https://cdn.ahyaya.net/videos/demo_build.mp4', NULL, NULL, '<!DOCTYPE html>\r\n<html>\r\n<head>\r\n</head>\r\n<body>\r\n<p>《星虫》是一个太空沙盒射击游戏。</p>\r\n<p>这是录制的《星虫》demo简单的建造演示视频，视频演示了从小行星采集，建造发电机、蓄电池、制造模组，最终通过制造模组生产了一批储物箱</p>\r\n</body>\r\n</html>', 0, 0, 0, 'ricky', 0, '2020-04-24 16:59:23', '2020-04-24 17:23:36', NULL);
INSERT INTO `article` VALUES (10, 'media', 'videos', '《星虫》demo飞船设计演示视频', NULL, 'https://cdn.ahyaya.net/images/article/cover_3.png', 'to left,rgba(115,104,118,1.0)0%,rgba(17,11,15,1.0)95%', 'https://cdn.ahyaya.net/videos/demo_make_ship.mp4', NULL, NULL, '<!DOCTYPE html>\r\n<html>\r\n<head>\r\n</head>\r\n<body>\r\n<p>《星虫》是一个太空沙盒射击游戏。</p>\r\n<p>这是录制的《星虫》demo简单的飞船设计演示视频，视频演示了利用块自定义自己飞船的外形，在飞船上安装推进器、武器等模块，以及自定义飞船推进器和发射激光的颜色</p>\r\n</body>\r\n</html>', 0, 2, 0, 'ricky', 0, '2020-04-24 16:59:23', '2020-12-22 12:50:44', NULL);
INSERT INTO `article` VALUES (11, 'article', 'news', '招募', '招募小伙伴共同开发游戏', 'https://cdn.ahyaya.net/images/article/cover_3.png', 'https://cdn.ahyaya.net/images/article/banner_3.png', NULL, NULL, NULL, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<h1>&nbsp; &nbsp;招募</h1>\n<hr />\n<p>&nbsp; &nbsp; 如果你已经大概了解了我正在开发的这款游戏的一些基本情况（了解详细情况请看<a href=\"http://stellarbug.ahyaya.net/#/article/4?main_type=article\">这里</a>），有志于参与开发这款游戏，请继续往下看。</p>\n<p>&nbsp; &nbsp; 这款游戏目前正处于<span style=\"font-size: 18pt;\"><strong>用爱发电</strong></span>阶段，在项目盈利前<span style=\"font-size: 18pt;\"><strong>无任何收入。</strong></span></p>\n<p><span style=\"font-size: 18pt;\"><span style=\"font-size: 12pt;\">&nbsp; &nbsp; 该项目的最终目标为登录steam并实现盈利，当然，这是存在<span style=\"font-size: 18pt;\"><strong>极大风险</strong></span>的。</span></span></p>\n<p><span style=\"font-size: 18pt;\"><span style=\"font-size: 12pt;\">&nbsp; &nbsp; 项目复杂度较高，需要花费<span style=\"font-size: 18pt;\"><strong>大量时间和精力</strong></span>。</span></span></p>\n<p><span style=\"font-size: 18pt;\"><span style=\"font-size: 12pt;\">&nbsp; &nbsp; 如果这些你都能接受，且你对自己的美术、编程、设计能力有信心，依然想要加入这个游戏的开发，可发简历至邮箱526046576@qq.com,我将会尽快回复~~</span></span></p>\n</body>\n</html>', 0, 2, 0, 'ricky', 0, '2020-04-27 17:28:31', '2020-12-27 22:57:39', NULL);

-- ----------------------------
-- Table structure for audio
-- ----------------------------
DROP TABLE IF EXISTS `audio`;
CREATE TABLE `audio`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `audio_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `audio_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `cover_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  `delete_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of audio
-- ----------------------------
INSERT INTO `audio` VALUES (1, '２８１４ - 新しい日の誕生', 'https://cdn.ahyaya.net/radios/%EF%BC%92%EF%BC%98%EF%BC%91%EF%BC%94%20-%20%E6%96%B0%E3%81%97%E3%81%84%E6%97%A5%E3%81%AE%E8%AA%95%E7%94%9F.mp3', 'https://cdn.ahyaya.net/images/music_cover/folder11.png', '2020-04-14 09:26:48', '2020-04-14 09:26:49', NULL);
INSERT INTO `audio` VALUES (2, '２８１４ - 新宿ゴールデン街', 'https://cdn.ahyaya.net/radios/%EF%BC%92%EF%BC%98%EF%BC%91%EF%BC%94%20-%20%E6%96%B0%E5%AE%BF%E3%82%B4%E3%83%BC%E3%83%AB%E3%83%87%E3%83%B3%E8%A1%97.mp3', 'https://cdn.ahyaya.net/images/music_cover/folder11.png', '2020-04-14 09:26:50', '2020-04-14 09:26:51', NULL);
INSERT INTO `audio` VALUES (3, 'Andreas Waldetoft - Synthetic God', 'https://cdn.ahyaya.net/radios/Andreas%20Waldetoft%20-%20Synthetic%20God.mp3', 'https://cdn.ahyaya.net/images/music_cover/folder10.png', '2020-04-14 09:26:53', '2020-04-14 09:26:54', NULL);
INSERT INTO `audio` VALUES (4, 'Andreas Waldetoft - The Birth of a Star', 'https://cdn.ahyaya.net/radios/Andreas%20Waldetoft%20-%20The%20Birth%20of%20a%20Star.mp3', 'https://cdn.ahyaya.net/images/music_cover/folder9.png', '2020-04-14 09:26:55', '2020-04-14 09:26:56', NULL);
INSERT INTO `audio` VALUES (5, 'CJ AngelGreey - Next To The Stars', 'https://cdn.ahyaya.net/radios/CJ%20AngelGreey%20-%20Next%20To%20The%20Stars.mp3', 'https://cdn.ahyaya.net/images/music_cover/folder8.png', '2020-04-14 09:26:57', '2020-04-14 09:26:58', NULL);
INSERT INTO `audio` VALUES (6, 'Disasterpeace - Adventure', 'https://cdn.ahyaya.net/radios/Disasterpeace%20-%20Adventure.mp3', 'https://cdn.ahyaya.net/images/music_cover/folder7.png', '2020-04-14 09:27:00', '2020-04-14 09:27:01', NULL);
INSERT INTO `audio` VALUES (7, 'Droid Bishop - Days Of The Running Man', 'https://cdn.ahyaya.net/radios/Droid%20Bishop%20-%20Days%20Of%20The%20Running%20Man.mp3', 'https://cdn.ahyaya.net/images/music_cover/folder6.png', '2020-04-14 09:27:02', '2020-04-14 09:27:03', NULL);
INSERT INTO `audio` VALUES (8, 'Hans Zimmer - Tick-Tock', 'https://cdn.ahyaya.net/radios/Hans%20Zimmer%20-%20Tick-Tock.mp3', 'https://cdn.ahyaya.net/images/music_cover/folder5.png', '2020-04-14 09:27:04', '2020-04-14 09:27:05', NULL);
INSERT INTO `audio` VALUES (9, 'Ryan Farish - Gentle Heart', 'https://cdn.ahyaya.net/radios/Ryan%20Farish%20-%20Gentle%20Heart.mp3', 'https://cdn.ahyaya.net/images/music_cover/folder4.png', '2020-04-14 09:27:07', '2020-04-14 09:27:09', NULL);
INSERT INTO `audio` VALUES (10, 'The Gaslamp Killer featuring Amir Yaghmai - Nissim', 'https://cdn.ahyaya.net/radios/The%20Gaslamp%20Killer%20featuring%20Amir%20Yaghmai%20-%20Nissim.mp3', 'https://cdn.ahyaya.net/images/music_cover/folder3.png', '2020-04-14 09:27:11', '2020-04-14 09:27:12', NULL);
INSERT INTO `audio` VALUES (11, 'Younger Brother - Crystalline (YB Remix)', 'https://cdn.ahyaya.net/radios/Younger%20Brother%20-%20Crystalline%20(YB%20Remix).mp3', 'https://cdn.ahyaya.net/images/music_cover/folder2.png', '2020-04-14 09:27:13', '2020-04-14 09:27:15', NULL);
INSERT INTO `audio` VALUES (12, '川井憲次 - 傀儡謡-阳炎は黄泉に待たむと', 'https://cdn.ahyaya.net/radios/%E5%B7%9D%E4%BA%95%E6%86%B2%E6%AC%A1%20-%20%E5%82%80%E5%84%A1%E8%AC%A1-%E9%98%B3%E7%82%8E%E3%81%AF%E9%BB%84%E6%B3%89%E3%81%AB%E5%BE%85%E3%81%9F%E3%82%80%E3%81%A8(%E3%81%8F%E3%81%90%E3%81%A4%E3%81%86%E3%81%9F%20%E3%81%8B%E3%81%92%E3%82%8D%E3%81%86%E3%81%AF%E3%82%88%E3%81%BF%E3%81%AB%E3%81%BE%E3%81%9F%E3%82%80%E3%81%A8).mp3', 'https://cdn.ahyaya.net/images/music_cover/folder1.png', '2020-04-14 09:27:17', '2020-04-14 09:27:18', NULL);

-- ----------------------------
-- Table structure for cms_option
-- ----------------------------
DROP TABLE IF EXISTS `cms_option`;
CREATE TABLE `cms_option`  (
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '后台管理系统部分设置',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  `delete_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_option
-- ----------------------------
INSERT INTO `cms_option` VALUES ('后台管理系统部分设置', '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<h1 style=\"text-align: center;\">公告栏</h1>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p><span style=\"color: #000000;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;新版网站测试上线啦ԅ(&macr;﹃&macr;ԅ)，若遇到任何Bug，显示错误，浏览器兼容性错误，或对网站功能有改进意见，请反馈给网站作者，或发送到以下邮箱内：<strong><span style=\"text-decoration: underline;\">526046576@qq.com</span></strong>&nbsp; &nbsp; &nbsp; 感谢大家的支持！</span></p>\n<p>&nbsp;</p>\n</body>\n</html>', '2019-12-31 11:21:26', '2020-09-23 15:29:46', NULL);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `head_icon_id` int(11) NULL DEFAULT 0,
  `content` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `article_id` int(11) NULL DEFAULT NULL,
  `likecount` int(11) NULL DEFAULT NULL,
  `hatecount` int(11) NULL DEFAULT NULL,
  `reportcount` int(11) NULL DEFAULT NULL,
  `cover_text` tinyint(1) NULL DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  `delete_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, '123', '2346@qq.com', 0, '测试测试测试测试', 5, 1, 0, 0, NULL, '2020-04-14 14:23:06', '2020-04-14 14:23:06', NULL);

-- ----------------------------
-- Table structure for comment_advise
-- ----------------------------
DROP TABLE IF EXISTS `comment_advise`;
CREATE TABLE `comment_advise`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `content` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  `delete_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment_advise
-- ----------------------------
INSERT INTO `comment_advise` VALUES (1, '测试1', '236@qq.com', '测试测试测试测试', '2020-04-14 14:18:58', '2020-04-14 14:18:58', NULL);
INSERT INTO `comment_advise` VALUES (2, '仁回尹', 'cc567821@126.com', '你好，我在indienova看到你发的招聘信息，然后进入这个网站，看到了星虫这款游戏，一见钟情，尤其喜欢这种探险的元素，虽然我想和你合作开发这款游戏，但是我经验不足，目前只会编程且unity3d上手才几个月，抱歉！不过我也会继续关注这款游戏，祝你成功！加油！', '2020-12-27 23:09:27', '2020-12-27 23:09:27', NULL);

-- ----------------------------
-- Table structure for comment_reply
-- ----------------------------
DROP TABLE IF EXISTS `comment_reply`;
CREATE TABLE `comment_reply`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `head_icon_id` int(11) NULL DEFAULT 0,
  `content` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `parent_comment_id` int(11) NULL DEFAULT NULL,
  `reply_user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `likecount` int(11) NULL DEFAULT NULL,
  `hatecount` int(11) NULL DEFAULT NULL,
  `reportcount` int(11) NULL DEFAULT NULL,
  `cover_text` tinyint(1) NULL DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  `delete_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment_reply
-- ----------------------------
INSERT INTO `comment_reply` VALUES (1, 'ricky', '526046576@qq.com', 9, '测试测试测试测试', 1, '123', 1, 0, 0, NULL, '2020-04-27 12:51:45', '2020-04-27 12:51:45', NULL);
INSERT INTO `comment_reply` VALUES (2, 'ricky', '526046576@qq.com', 8, '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测1111111111111111111111111111111111111111111111111111111111111111111111111', 1, 'ricky', 1, 0, 0, NULL, '2020-04-27 12:52:25', '2020-04-27 12:52:25', NULL);

-- ----------------------------
-- Table structure for hit_count
-- ----------------------------
DROP TABLE IF EXISTS `hit_count`;
CREATE TABLE `hit_count`  (
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '网站点击数',
  `hitcount` int(11) NULL DEFAULT 0,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  `delete_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE INDEX `hitcount`(`hitcount`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hit_count
-- ----------------------------
INSERT INTO `hit_count` VALUES ('网站点击数', 716, '2020-02-16 15:36:05', '2021-02-03 16:08:50', NULL);

-- ----------------------------
-- Table structure for lin_auth
-- ----------------------------
DROP TABLE IF EXISTS `lin_auth`;
CREATE TABLE `lin_auth`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NULL DEFAULT NULL,
  `auth` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `module` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of lin_auth
-- ----------------------------
INSERT INTO `lin_auth` VALUES (1, 1, '设置活动弹窗', '活动弹窗');
INSERT INTO `lin_auth` VALUES (2, 1, '查看文章', '文章');
INSERT INTO `lin_auth` VALUES (3, 1, '创建文章', '文章');
INSERT INTO `lin_auth` VALUES (4, 1, '恢复文章', '文章');
INSERT INTO `lin_auth` VALUES (5, 1, '更新文章', '文章');
INSERT INTO `lin_auth` VALUES (6, 1, '删除文章', '文章');
INSERT INTO `lin_auth` VALUES (7, 1, '查看音频', '文件');
INSERT INTO `lin_auth` VALUES (8, 1, '删除音频', '文件');
INSERT INTO `lin_auth` VALUES (9, 1, '上传图片', '文件');
INSERT INTO `lin_auth` VALUES (10, 1, '查看图片', '文件');
INSERT INTO `lin_auth` VALUES (11, 1, '删除图片', '文件');
INSERT INTO `lin_auth` VALUES (12, 1, '上传视频', '文件');
INSERT INTO `lin_auth` VALUES (13, 1, '查看视频', '文件');
INSERT INTO `lin_auth` VALUES (14, 1, '删除视频', '文件');
INSERT INTO `lin_auth` VALUES (15, 1, '上传音频', '文件');
INSERT INTO `lin_auth` VALUES (16, 1, '创建音乐', '音乐');
INSERT INTO `lin_auth` VALUES (17, 1, '恢复音乐', '音乐');
INSERT INTO `lin_auth` VALUES (18, 1, '更新音乐', '音乐');
INSERT INTO `lin_auth` VALUES (19, 1, '修改告示板内容', '信息');
INSERT INTO `lin_auth` VALUES (20, 1, '查看评论', '评论');
INSERT INTO `lin_auth` VALUES (21, 1, '创建评论', '评论');
INSERT INTO `lin_auth` VALUES (22, 1, '恢复评论', '评论');
INSERT INTO `lin_auth` VALUES (23, 1, '更新评论', '评论');
INSERT INTO `lin_auth` VALUES (24, 1, '删除评论', '评论');
INSERT INTO `lin_auth` VALUES (25, 1, '查看回复', '回复');
INSERT INTO `lin_auth` VALUES (26, 1, '创建回复', '回复');
INSERT INTO `lin_auth` VALUES (27, 1, '恢复回复', '回复');
INSERT INTO `lin_auth` VALUES (28, 1, '更新回复', '回复');
INSERT INTO `lin_auth` VALUES (29, 1, '删除回复', '回复');
INSERT INTO `lin_auth` VALUES (30, 1, '查看反馈', '反馈');
INSERT INTO `lin_auth` VALUES (31, 1, '恢复反馈', '反馈');
INSERT INTO `lin_auth` VALUES (32, 1, '删除反馈', '反馈');
INSERT INTO `lin_auth` VALUES (33, 1, '查询所有日志', '日志');
INSERT INTO `lin_auth` VALUES (34, 1, '搜索日志', '日志');
INSERT INTO `lin_auth` VALUES (35, 1, '查询日志记录的用户', '日志');
INSERT INTO `lin_auth` VALUES (36, 1, '清空日志', '日志');

-- ----------------------------
-- Table structure for lin_file
-- ----------------------------
DROP TABLE IF EXISTS `lin_file`;
CREATE TABLE `lin_file`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1 local，其他表示其他地方',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `extension` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `size` int(11) NULL DEFAULT NULL,
  `md5` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '图片md5值，防止上传重复图片',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `md5`(`md5`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of lin_file
-- ----------------------------
INSERT INTO `lin_file` VALUES (1, '2020/04/14/3d84b687-117c-41e2-920e-15ab7b29b30f.mp3', 3, '２８１４ - 新しい日の誕生|3d84b687-117c-41e2-920e-15ab7b29b30f', '.mp3', 12774730, '0473cc3bfd33ed94adda6953e7a09e39');
INSERT INTO `lin_file` VALUES (2, '2020/04/14/08baeda7-cd95-4a39-9bc7-afea5b60b32c.mp3', 3, '２８１４ - 新宿ゴールデン街|08baeda7-cd95-4a39-9bc7-afea5b60b32c', '.mp3', 8736431, '87b57def4d73bb26e481fa6793e30b75');
INSERT INTO `lin_file` VALUES (3, '2020/04/14/16bbaf48-096f-46f4-89aa-450ab9fc45d1.png', 1, 'folder|16bbaf48-096f-46f4-89aa-450ab9fc45d1', '.png', 9637, '9767616bdfb1db1cd8cfc53d1404d09c');
INSERT INTO `lin_file` VALUES (4, '2020/04/14/32bfaae7-5524-4a54-9f63-b146479c24a0.png', 1, 'folder2|32bfaae7-5524-4a54-9f63-b146479c24a0', '.png', 5975, 'f02f37692c66f64703a622f03938ba41');
INSERT INTO `lin_file` VALUES (5, '2020/04/14/f91010bd-4abe-4cda-8faa-12e9916f48ea.png', 1, 'folder3|f91010bd-4abe-4cda-8faa-12e9916f48ea', '.png', 8691, 'f25ef5393564c9a04b3dee728afca65d');
INSERT INTO `lin_file` VALUES (6, '2020/04/14/aa65839b-8f43-4c66-a8a5-9f839f11d4e3.png', 1, 'folder4|aa65839b-8f43-4c66-a8a5-9f839f11d4e3', '.png', 9683, 'f5cda8d08784f8e564ed6308072a9929');
INSERT INTO `lin_file` VALUES (7, '2020/04/14/01e188e4-52cf-464f-b2d6-a87db79e6eea.png', 1, 'folder5|01e188e4-52cf-464f-b2d6-a87db79e6eea', '.png', 9993, '6ac4fd43d96e6ac80be068af9325bca0');
INSERT INTO `lin_file` VALUES (8, '2020/04/14/ef10a03e-a748-4f1e-bbea-672ff2abfa6b.png', 1, 'folder6|ef10a03e-a748-4f1e-bbea-672ff2abfa6b', '.png', 8704, 'dfc9e825c369ae569546bf3c97fc5c11');
INSERT INTO `lin_file` VALUES (9, '2020/04/14/288a524c-2cb1-42a7-9c1f-a476ebcbca57.png', 1, 'folder7|288a524c-2cb1-42a7-9c1f-a476ebcbca57', '.png', 6404, '6a65021ee0535ae66c71ae12b885c044');
INSERT INTO `lin_file` VALUES (10, '2020/04/14/a80fdcfd-19d0-4b40-b58f-0ab89f549838.png', 1, 'folder8|a80fdcfd-19d0-4b40-b58f-0ab89f549838', '.png', 7552, '3756a3a2ec9158b8b078b4ae815fdc28');
INSERT INTO `lin_file` VALUES (11, '2020/04/14/542cb3bb-40f8-465f-a19e-b613fa08ab0a.png', 1, 'folder9|542cb3bb-40f8-465f-a19e-b613fa08ab0a', '.png', 9468, 'db2fec0e9779a09dc8c508095bc31573');
INSERT INTO `lin_file` VALUES (12, '2020/04/14/a2c9609f-9427-4fd9-a146-9a2bfb1f0357.png', 1, 'folder10|a2c9609f-9427-4fd9-a146-9a2bfb1f0357', '.png', 8859, 'cf8a13a8b3f141836e834199bf4c8855');
INSERT INTO `lin_file` VALUES (13, '2020/04/14/a61d7d7e-1204-4fbe-8d69-0ffdb8f1b59b.png', 1, 'folder11|a61d7d7e-1204-4fbe-8d69-0ffdb8f1b59b', '.png', 10270, 'b3d3ae5ba500cc4768cbb5c2a63d7c6d');
INSERT INTO `lin_file` VALUES (14, '2020/04/14/ef6515cc-cd3f-4272-91bf-112c69677f06.mp3', 3, 'Andreas Waldetoft - Synthetic God|ef6515cc-cd3f-4272-91bf-112c69677f06', '.mp3', 4911013, '46649fc45781be3702f26556919cfc17');
INSERT INTO `lin_file` VALUES (15, '2020/04/14/1311967e-9314-4341-9da8-da0332c818f9.mp3', 3, 'Andreas Waldetoft - The Birth of a Star|1311967e-9314-4341-9da8-da0332c818f9', '.mp3', 16076092, 'c66e87d212d084999854f3309b6dc4de');
INSERT INTO `lin_file` VALUES (16, '2020/04/14/4f911a38-d20b-4244-830a-e6a3d35e4ab6.mp3', 3, 'CJ AngelGreey - Next To The Stars|4f911a38-d20b-4244-830a-e6a3d35e4ab6', '.mp3', 15921190, '7d1c26e4ecd9f4425b414b6ad65443f0');
INSERT INTO `lin_file` VALUES (17, '2020/04/14/c7aac5db-a04c-4fcd-ac18-8e04a34da9cf.mp3', 3, 'Disasterpeace - Adventure|c7aac5db-a04c-4fcd-ac18-8e04a34da9cf', '.mp3', 5178262, 'af7b0c552e580724e684f169b1c4954f');
INSERT INTO `lin_file` VALUES (18, '2020/04/14/3889513a-9ea8-4eee-9509-f753c09c407d.mp3', 3, 'Droid Bishop - Days Of The Running Man|3889513a-9ea8-4eee-9509-f753c09c407d', '.mp3', 5973388, 'dc5684ac581b10e3f3be7ba6e1414995');
INSERT INTO `lin_file` VALUES (19, '2020/04/14/03c7bcd1-2507-4a59-9df2-6c9654088425.mp3', 3, 'Hans Zimmer - Tick-Tock|03c7bcd1-2507-4a59-9df2-6c9654088425', '.mp3', 20404129, 'c84f51a7cb73c805f79ab53d6707c29d');
INSERT INTO `lin_file` VALUES (20, '2020/04/14/58281f6a-a49e-4ce8-9041-8083ac100f8d.mp3', 3, 'Ryan Farish - Gentle Heart|58281f6a-a49e-4ce8-9041-8083ac100f8d', '.mp3', 10409712, 'fd2dd01c1b42357b4c573df5cd084b82');
INSERT INTO `lin_file` VALUES (21, '2020/04/14/33bc4ad1-4ae9-4296-9f6c-22e93aa78010.mp3', 3, 'The Gaslamp Killer featuring Amir Yaghmai - Nissim|33bc4ad1-4ae9-4296-9f6c-22e93aa78010', '.mp3', 11066506, '6204514356f7560ed9d093a7f2aa1e4b');
INSERT INTO `lin_file` VALUES (22, '2020/04/14/1ba271f3-f90e-4762-9a18-8d6d348e76b1.mp3', 3, 'Younger Brother - Crystalline (YB Remix)|1ba271f3-f90e-4762-9a18-8d6d348e76b1', '.mp3', 14299154, '7892640b588c17b3ca54a16a291e0cab');
INSERT INTO `lin_file` VALUES (23, '2020/04/14/c1301490-fda9-40a7-b0f1-5eef2f23c72e.mp3', 3, '川井憲次 - 傀儡謡-阳炎は黄泉に待たむと(くぐつうた かげろうはよみにまたむと)|c1301490-fda9-40a7-b0f1-5eef2f23c72e', '.mp3', 24019843, 'd0040f787da94d14a968598a21161d6f');
INSERT INTO `lin_file` VALUES (24, '2020/04/14/9495b460-c1d7-4ac0-b645-68e752943f81.png', 1, 'article-cover-1|9495b460-c1d7-4ac0-b645-68e752943f81', '.png', 10016, 'aafa71871ba5a696064ec4c7df7d83ce');
INSERT INTO `lin_file` VALUES (25, '2020/04/14/9aca5759-3a7b-46c0-aef9-58656a82bcd7.png', 1, 'article-cover-2|9aca5759-3a7b-46c0-aef9-58656a82bcd7', '.png', 32820, '14144969bb1d0aa7d94e9b7ca552c4d9');
INSERT INTO `lin_file` VALUES (26, '2020/04/14/0eb9122d-1f43-495a-b96e-9a1e74af504b.png', 1, 'article-header-1|0eb9122d-1f43-495a-b96e-9a1e74af504b', '.png', 18139, '0a734859be7bfe8acbc7b449806cc7f5');
INSERT INTO `lin_file` VALUES (27, '2020/04/14/421f71af-0de1-4639-b741-697cd79f3f3c.png', 1, 'article-header-2|421f71af-0de1-4639-b741-697cd79f3f3c', '.png', 101429, '9fe386e19366ce106862f5bfe1f7e755');

-- ----------------------------
-- Table structure for lin_group
-- ----------------------------
DROP TABLE IF EXISTS `lin_group`;
CREATE TABLE `lin_group`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of lin_group
-- ----------------------------
INSERT INTO `lin_group` VALUES (1, '网站管理员', '开启全部权限');

-- ----------------------------
-- Table structure for lin_log
-- ----------------------------
DROP TABLE IF EXISTS `lin_log`;
CREATE TABLE `lin_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(450) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status_code` int(11) NULL DEFAULT NULL,
  `method` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `path` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `authority` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 55 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of lin_log
-- ----------------------------
INSERT INTO `lin_log` VALUES (1, '管理员super新建了权限组', 1, 'super', 201, 'POST', '/v1/client-cms/admin/group', '', '2020-04-03 16:15:41');
INSERT INTO `lin_log` VALUES (2, 'super创建了文章', 1, 'super', 201, 'POST', '/v1/client-cms/article', '创建文章', '2020-04-13 17:00:58');
INSERT INTO `lin_log` VALUES (3, '{user.username}创建了文章', 1, 'super', 201, 'POST', '/v1/client-cms/article', '创建文章', '2020-04-13 17:21:47');
INSERT INTO `lin_log` VALUES (4, 'super更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/6', '更新文章', '2020-04-13 17:30:27');
INSERT INTO `lin_log` VALUES (5, '{user.username}更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/5', '更新文章', '2020-04-13 22:54:33');
INSERT INTO `lin_log` VALUES (6, 'super更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/6', '更新文章', '2020-04-13 23:25:42');
INSERT INTO `lin_log` VALUES (7, '{user.username}更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/6', '更新文章', '2020-04-13 23:47:54');
INSERT INTO `lin_log` VALUES (8, 'super上传了图片', 1, 'super', 200, 'POST', '/v1/client-cms/file/upload-image', '上传图片', '2020-04-14 08:12:37');
INSERT INTO `lin_log` VALUES (9, 'super上传了图片', 1, 'super', 200, 'POST', '/v1/client-cms/file/upload-image', '上传图片', '2020-04-14 08:14:56');
INSERT INTO `lin_log` VALUES (10, '{user.username}上传了音频', 1, 'super', 200, 'POST', '/v1/client-cms/file/upload-audio', '上传音频', '2020-04-14 08:15:29');
INSERT INTO `lin_log` VALUES (11, 'super上传了音频', 1, 'super', 200, 'POST', '/v1/client-cms/file/upload-audio', '上传音频', '2020-04-14 08:16:28');
INSERT INTO `lin_log` VALUES (12, '{user.username}上传了音频', 1, 'super', 200, 'POST', '/v1/client-cms/file/upload-audio', '上传音频', '2020-04-14 08:20:12');
INSERT INTO `lin_log` VALUES (13, 'super上传了音频', 1, 'super', 200, 'POST', '/v1/client-cms/file/upload-audio', '上传音频', '2020-04-14 09:02:17');
INSERT INTO `lin_log` VALUES (14, 'super上传了音频', 1, 'super', 200, 'POST', '/v1/client-cms/file/upload-audio', '上传音频', '2020-04-14 09:14:14');
INSERT INTO `lin_log` VALUES (15, '{user.username}上传了图片', 1, 'super', 200, 'POST', '/v1/client-cms/file/upload-image', '上传图片', '2020-04-14 09:16:01');
INSERT INTO `lin_log` VALUES (16, 'super上传了图片', 1, 'super', 200, 'POST', '/v1/client-cms/file/upload-image', '上传图片', '2020-04-14 09:16:08');
INSERT INTO `lin_log` VALUES (17, '{user.username}上传了音频', 1, 'super', 200, 'POST', '/v1/client-cms/file/upload-audio', '上传音频', '2020-04-14 09:17:20');
INSERT INTO `lin_log` VALUES (18, 'super上传了音频', 1, 'super', 200, 'POST', '/v1/client-cms/file/upload-audio', '上传音频', '2020-04-14 09:18:45');
INSERT INTO `lin_log` VALUES (19, '{user.username}上传了音频', 1, 'super', 200, 'POST', '/v1/client-cms/file/upload-audio', '上传音频', '2020-04-14 09:21:36');
INSERT INTO `lin_log` VALUES (20, 'super上传了图片', 1, 'super', 200, 'POST', '/v1/client-cms/file/upload-image', '上传图片', '2020-04-14 10:02:06');
INSERT INTO `lin_log` VALUES (21, '{user.username}更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/6', '更新文章', '2020-04-14 10:04:04');
INSERT INTO `lin_log` VALUES (22, 'super更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/5', '更新文章', '2020-04-14 10:04:37');
INSERT INTO `lin_log` VALUES (23, '{user.username}更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/6', '更新文章', '2020-04-14 10:07:06');
INSERT INTO `lin_log` VALUES (24, 'super更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/5', '更新文章', '2020-04-14 10:07:39');
INSERT INTO `lin_log` VALUES (25, '{user.username}更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/5', '更新文章', '2020-04-14 14:05:44');
INSERT INTO `lin_log` VALUES (26, 'super更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/5', '更新文章', '2020-04-14 15:14:58');
INSERT INTO `lin_log` VALUES (27, 'super创建了文章', 1, 'super', 201, 'POST', '/v1/client-cms/article', '创建文章', '2020-04-22 23:57:13');
INSERT INTO `lin_log` VALUES (28, '{user.username}更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/7', '更新文章', '2020-04-23 00:19:11');
INSERT INTO `lin_log` VALUES (29, 'super更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/7', '更新文章', '2020-04-23 13:52:26');
INSERT INTO `lin_log` VALUES (30, '{user.username}更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/7', '更新文章', '2020-04-23 13:59:02');
INSERT INTO `lin_log` VALUES (31, 'super更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/7', '更新文章', '2020-04-23 14:06:50');
INSERT INTO `lin_log` VALUES (32, '{user.username}更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/6', '更新文章', '2020-04-24 08:40:38');
INSERT INTO `lin_log` VALUES (33, 'super创建了文章', 1, 'super', 201, 'POST', '/v1/client-cms/article', '创建文章', '2020-04-24 16:59:23');
INSERT INTO `lin_log` VALUES (34, '{user.username}更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/8', '更新文章', '2020-04-24 17:05:02');
INSERT INTO `lin_log` VALUES (35, 'super更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/8', '更新文章', '2020-04-24 17:23:05');
INSERT INTO `lin_log` VALUES (36, '{user.username}更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/8', '更新文章', '2020-04-24 17:23:36');
INSERT INTO `lin_log` VALUES (37, 'super更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/4', '更新文章', '2020-04-26 15:52:00');
INSERT INTO `lin_log` VALUES (38, '{user.username}更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/4', '更新文章', '2020-04-26 16:09:02');
INSERT INTO `lin_log` VALUES (39, 'super更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/4', '更新文章', '2020-04-27 14:11:54');
INSERT INTO `lin_log` VALUES (40, '{user.username}更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/4', '更新文章', '2020-04-27 14:24:27');
INSERT INTO `lin_log` VALUES (41, 'super更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/4', '更新文章', '2020-04-27 17:03:08');
INSERT INTO `lin_log` VALUES (42, '{user.username}更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/4', '更新文章', '2020-04-27 17:11:39');
INSERT INTO `lin_log` VALUES (43, 'super更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/4', '更新文章', '2020-04-27 17:26:51');
INSERT INTO `lin_log` VALUES (44, '{user.username}创建了文章', 1, 'super', 201, 'POST', '/v1/client-cms/article', '创建文章', '2020-04-27 17:28:31');
INSERT INTO `lin_log` VALUES (45, 'super更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/4', '更新文章', '2020-04-27 20:47:29');
INSERT INTO `lin_log` VALUES (46, '{user.username}更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/11', '更新文章', '2020-04-27 21:01:03');
INSERT INTO `lin_log` VALUES (47, 'super更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/11', '更新文章', '2020-04-27 21:04:06');
INSERT INTO `lin_log` VALUES (48, '{user.username}更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/11', '更新文章', '2020-04-27 21:04:33');
INSERT INTO `lin_log` VALUES (49, 'super更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/4', '更新文章', '2020-04-27 21:06:09');
INSERT INTO `lin_log` VALUES (50, '{user.username}更新了文章内容', 1, 'super', 201, 'PUT', '/v1/client-cms/article/4', '更新文章', '2020-04-29 10:03:40');
INSERT INTO `lin_log` VALUES (51, '管理员super新建了权限组', 1, 'super', 201, 'POST', '/v1/client-cms/admin/group', '', '2020-09-23 15:27:57');
INSERT INTO `lin_log` VALUES (52, '管理员{user.username}删除了的权限组', 1, 'super', 201, 'DELETE', '/v1/client-cms/admin/group/2', '', '2020-09-23 15:28:02');
INSERT INTO `lin_log` VALUES (53, '管理员super修改了告示板内容', 1, 'super', 201, 'PUT', '/v1/client-cms/cms-option/content', '修改告示板内容', '2020-09-23 15:29:32');
INSERT INTO `lin_log` VALUES (54, '管理员{user.username}修改了告示板内容', 1, 'super', 201, 'PUT', '/v1/client-cms/cms-option/content', '修改告示板内容', '2020-09-23 15:29:46');

-- ----------------------------
-- Table structure for lin_user
-- ----------------------------
DROP TABLE IF EXISTS `lin_user`;
CREATE TABLE `lin_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '头像url',
  `admin` tinyint(4) NOT NULL DEFAULT 1,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `group_id` int(11) NULL DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  `delete_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of lin_user
-- ----------------------------
INSERT INTO `lin_user` VALUES (1, 'super', NULL, NULL, 2, 1, NULL, NULL, 'sha1$070accd7$1$5f2b52e72933d084851dd683b7806b6ad860db5b', '2020-03-11 11:21:57', '2020-03-11 11:21:57', NULL);

-- ----------------------------
-- Table structure for main_type
-- ----------------------------
DROP TABLE IF EXISTS `main_type`;
CREATE TABLE `main_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tab_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `router_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `child_types` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `carousel_types` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  `delete_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of main_type
-- ----------------------------
INSERT INTO `main_type` VALUES (1, '首页', 'homepage', '', '', '2019-11-20 15:05:00', '2019-11-20 15:05:00', NULL);
INSERT INTO `main_type` VALUES (2, '日志', 'article', '开发日志&development-log*新闻&news*Unity3D&unity3d*C#&csharp*生活随笔&life-log*WEB&web', '', '2019-11-20 15:05:00', '2019-11-20 15:05:00', NULL);
INSERT INTO `main_type` VALUES (3, '媒体', 'media', '视频&videos*音频&radios*截图&images', '', '2019-11-20 15:05:00', '2019-11-20 15:05:00', NULL);
INSERT INTO `main_type` VALUES (4, '关于', 'about', '', '', '2019-11-20 15:05:00', '2019-11-20 15:05:00', NULL);

SET FOREIGN_KEY_CHECKS = 1;
