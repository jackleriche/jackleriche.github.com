/**
 * \file MasterSS.js
 * \brief Master SpriteSheet assets from Flash.
 */
(function (window) {
    "use strict";
    //set local paths to external files
    var camelot = window.com.camelot,
        iwg = camelot.iwg,
        images = window.com.camelot.core.iwgLoadQ.images,
        MasterSS = function () {
            //singletonCache
            if (typeof MasterSS.instance !== "object") MasterSS.instance = this;
            return MasterSS.instance;
        },
        //make an instance if needed
        _MasterSS = new MasterSS();
    //add and set "next":false to stop on last frame
    //Static
    MasterSS.VERSION = '0.0.1';
    MasterSS.spriteSheet = {
        "images": [images.masterSS],
        "frames": [

    [1545, 2, 84, 84], 
    [1545, 88, 84, 84], 
    [1545, 174, 84, 84], 
    [551, 1033, 84, 84], 
    [1249, 232, 84, 84], 
    [5, 1704, 84, 84], 
    [1335, 233, 84, 84], 
    [243, 1200, 84, 84], 
    [243, 1286, 84, 84], 
    [243, 1372, 84, 84], 
    [329, 1196, 84, 84], 
    [329, 1282, 84, 84], 
    [415, 1196, 84, 84], 
    [329, 1368, 84, 84], 
    [415, 1282, 84, 84], 
    [415, 1368, 84, 84], 
    [818, 669, 84, 84], 
    [196, 1464, 84, 84], 
    [5, 1790, 84, 84], 
    [2, 1876, 84, 84], 
    [2, 1962, 84, 84], 
    [1421, 233, 84, 84], 
    [91, 1704, 84, 84], 
    [91, 1790, 84, 84], 
    [88, 1876, 84, 84], 
    [88, 1962, 84, 84], 
    [865, 415, 84, 84], 
    [951, 415, 84, 84], 
    [865, 501, 84, 84], 
    [1037, 415, 84, 84], 
    [951, 501, 84, 84], 
    [1037, 501, 84, 84], 
    [904, 633, 84, 84], 
    [990, 633, 84, 84], 
    [551, 937, 94, 94], 
    [910, 2, 429, 228], 
    [1553, 438, 76, 76], 
    [1553, 516, 76, 76], 
    [865, 633, 34, 34], 
    [1464, 187, 24, 24], 
    [282, 1458, 84, 84], 
    [368, 1454, 84, 84], 
    [454, 1454, 84, 84], 
    [551, 1119, 84, 84], 
    [501, 1205, 84, 84], 
    [501, 1291, 84, 84], 
    [587, 1205, 84, 84], 
    [587, 1291, 84, 84], 
    [624, 669, 192, 100], 
    [2, 1464, 192, 100], 
    [540, 1423, 84, 84], 
    [540, 1509, 84, 84], 
    [626, 1423, 84, 84], 
    [626, 1509, 84, 84], 
    [637, 1075, 84, 84], 
    [723, 1077, 84, 84], 
    [809, 1077, 84, 84], 
    [1123, 415, 84, 84], 
    [1123, 501, 84, 84], 
    [1076, 633, 84, 84], 
    [1209, 415, 84, 84], 
    [1209, 501, 84, 84], 
    [1295, 415, 84, 84], 
    [1295, 501, 84, 84], 
    [1162, 633, 84, 84], 
    [1248, 633, 84, 84], 
    [1225, 719, 84, 84], 
    [1355, 319, 84, 84], 
    [1381, 405, 84, 84], 
    [1381, 491, 84, 84], 
    [1507, 352, 84, 84], 
    [1467, 438, 84, 84], 
    [1467, 524, 84, 84], 
    [1381, 577, 84, 84], 
    [1467, 610, 84, 84], 
    [818, 755, 84, 84], 
    [904, 765, 84, 84], 
    [990, 765, 84, 84], 
    [1076, 765, 84, 84], 
    [898, 851, 84, 84], 
    [624, 405, 239, 262], 
    [2, 893, 306, 305], 
    [2, 1566, 1, 265], 
    [2, 1200, 239, 262], 
    [310, 893, 239, 262], 
    [2, 405, 620, 426], 
    [984, 851, 84, 84], 
    [1070, 851, 84, 84], 
    [1311, 719, 84, 84], 
    [1222, 805, 84, 84], 
    [1308, 805, 84, 84], 
    [1222, 891, 84, 84], 
    [1308, 891, 84, 84], 
    [196, 1550, 84, 84], 
    [282, 1544, 84, 84], 
    [368, 1540, 84, 84], 
    [454, 1540, 84, 84], 
    [540, 1595, 84, 84], 
    [626, 1595, 84, 84], 
    [712, 1423, 84, 84], 
    [712, 1509, 84, 84], 
    [1162, 765, 58, 58], 
    [1162, 825, 58, 58], 
    [133, 1613, 58, 58], 
    [1480, 798, 58, 58], 
    [1480, 858, 58, 58], 
    [1540, 798, 58, 58], 
    [787, 893, 109, 44], 
    [1341, 187, 121, 44], 
    [614, 1377, 107, 44], 
    [1149, 369, 101, 44], 
    [774, 985, 113, 44], 
    [647, 983, 125, 44], 
    [501, 1377, 111, 44], 
    [756, 1031, 103, 44], 
    [1033, 369, 114, 44], 
    [647, 937, 126, 44], 
    [1019, 719, 101, 44], 
    [5, 1566, 141, 44], 
    [910, 323, 153, 44], 
    [865, 587, 113, 44], 
    [1208, 323, 101, 44], 
    [1553, 594, 66, 66], 
    [750, 817, 66, 66], 
    [712, 1595, 84, 84], 
    [282, 1630, 84, 84], 
    [368, 1626, 84, 84], 
    [454, 1626, 84, 84], 
    [1553, 662, 66, 66], 
    [177, 1808, 66, 66], 
    [245, 1808, 66, 66], 
    [313, 1808, 66, 66], 
    [467, 1798, 66, 66], 
    [346, 1970, 66, 66], 
    [414, 1970, 66, 66], 
    [482, 1970, 66, 66], 
    [1153, 1023, 66, 66], 
    [894, 1969, 66, 66], 
    [962, 1969, 66, 66], 
    [1030, 1969, 66, 66], 
    [1098, 1969, 66, 66], 
    [1142, 1521, 66, 66], 
    [1142, 1589, 66, 66], 
    [1142, 1657, 66, 66], 
    [1142, 1725, 66, 66], 
    [1142, 1793, 66, 66], 
    [1152, 1861, 66, 66], 
    [1210, 1521, 66, 66], 
    [1210, 1589, 66, 66], 
    [1210, 1657, 66, 66], 
    [1210, 1725, 66, 66], 
    [1210, 1793, 66, 66], 
    [1220, 1861, 66, 66], 
    [540, 1681, 84, 84], 
    [626, 1681, 84, 84], 
    [712, 1681, 84, 84], 
    [368, 1712, 84, 84], 
    [2, 890, 870, 1], 
    [910, 232, 337, 89], 
    [1278, 1493, 66, 66], 
    [1278, 1561, 66, 66], 
    [1346, 1493, 66, 66], 
    [1278, 1629, 66, 66], 
    [1346, 1561, 66, 66], 
    [1414, 1493, 66, 66], 
    [454, 1712, 84, 84], 
    [540, 1767, 84, 84], 
    [626, 1767, 84, 84], 
    [712, 1767, 84, 84], 
    [1278, 1697, 66, 66], 
    [1346, 1629, 66, 66], 
    [1414, 1561, 66, 66], 
    [1482, 1493, 66, 66], 
    [1278, 1765, 66, 66], 
    [1346, 1697, 66, 66], 
    [1414, 1629, 66, 66], 
    [1482, 1561, 66, 66], 
    [1346, 1765, 66, 66], 
    [1341, 2, 202, 183], 
    [174, 1876, 84, 84], 
    [174, 1962, 84, 84], 
    [1394, 805, 84, 84], 
    [1394, 891, 84, 84], 
    [1414, 1697, 66, 66], 
    [1482, 1629, 66, 66], 
    [1414, 1765, 66, 66], 
    [1482, 1697, 66, 66], 
    [1482, 1765, 66, 66], 
    [1288, 1833, 66, 66], 
    [1356, 1833, 66, 66], 
    [1424, 1833, 66, 66], 
    [1492, 1833, 66, 66], 
    [1550, 1493, 66, 66], 
    [1550, 1561, 66, 66], 
    [1550, 1629, 66, 66], 
    [1550, 1697, 66, 66], 
    [1550, 1765, 66, 66], 
    [1560, 1833, 66, 66], 
    [1166, 1929, 66, 66], 
    [1234, 1929, 66, 66], 
    [1302, 1901, 66, 66], 
    [1370, 1901, 66, 66], 
    [1438, 1901, 66, 66], 
    [1506, 1901, 66, 66], 
    [1302, 1969, 66, 66], 
    [1370, 1969, 66, 66], 
    [1438, 1969, 66, 66], 
    [1506, 1969, 66, 66], 
    [1397, 663, 66, 66], 
    [1397, 731, 66, 66], 
    [1465, 696, 66, 66], 
    [1507, 306, 109, 44], 
    [910, 369, 121, 44], 
    [647, 1029, 107, 44], 
    [1252, 369, 101, 44], 
    [980, 587, 113, 44], 
    [5, 1658, 125, 44], 
    [1507, 260, 111, 44], 
    [1095, 587, 103, 44], 
    [775, 939, 114, 44], 
    [5, 1612, 126, 44], 
    [1200, 587, 101, 44], 
    [1065, 323, 141, 44], 
    [624, 771, 153, 44], 
    [904, 719, 113, 44], 
    [1122, 719, 101, 44], 
    [1533, 730, 66, 66], 
    [193, 1636, 84, 84], 
    [177, 1722, 84, 84], 
    [263, 1722, 84, 84], 
    [260, 1876, 84, 84], 
    [260, 1962, 84, 84], 
    [381, 1798, 84, 84], 
    [346, 1884, 84, 84], 
    [432, 1884, 84, 84], 
    [535, 1853, 84, 84], 
    [621, 1853, 84, 84], 
    [707, 1853, 84, 84], 
    [550, 1939, 84, 84], 
    [636, 1939, 84, 84], 
    [722, 1939, 84, 84], 
    [793, 1853, 84, 84], 
    [808, 1939, 84, 84], 
    [898, 937, 84, 84], 
    [2, 2, 906, 401], 
    [984, 937, 84, 84], 
    [1070, 937, 84, 84], 
    [1221, 977, 84, 84], 
    [1307, 977, 84, 84], 
    [1393, 977, 84, 84], 
    [895, 1023, 84, 84], 
    [981, 1023, 84, 84], 
    [1067, 1023, 84, 84], 
    [895, 1109, 84, 84], 
    [981, 1109, 84, 84], 
    [1067, 1109, 84, 84], 
    [1153, 1091, 84, 84], 
    [1239, 1063, 84, 84], 
    [1325, 1063, 84, 84], 
    [148, 1566, 41, 45], 
    [1411, 1063, 84, 84], 
    [1239, 1149, 84, 84], 
    [1325, 1149, 84, 84], 
    [1411, 1149, 84, 84], 
    [1153, 1177, 84, 84], 
    [1239, 1235, 84, 84], 
    [1325, 1235, 84, 84], 
    [1411, 1235, 84, 84], 
    [1479, 977, 84, 84], 
    [1497, 1063, 84, 84], 
    [1497, 1149, 84, 84], 
    [1497, 1235, 84, 84], 
    [723, 1163, 84, 84], 
    [809, 1163, 84, 84], 
    [895, 1195, 84, 84], 
    [981, 1195, 84, 84], 
    [1067, 1195, 84, 84], 
    [1153, 1263, 84, 84], 
    [673, 1249, 84, 84], 
    [759, 1249, 84, 84], 
    [723, 1335, 84, 84], 
    [809, 1335, 84, 84], 
    [798, 1421, 84, 84], 
    [798, 1507, 84, 84], 
    [798, 1593, 84, 84], 
    [798, 1679, 84, 84], 
    [798, 1765, 84, 84], 
    [895, 1281, 84, 84], 
    [981, 1281, 84, 84], 
    [1067, 1281, 84, 84], 
    [895, 1367, 84, 84], 
    [981, 1367, 84, 84], 
    [1067, 1367, 84, 84], 
    [1153, 1349, 84, 84], 
    [1239, 1321, 84, 84], 
    [1325, 1321, 84, 84], 
    [1411, 1321, 84, 84], 
    [1497, 1321, 84, 84], 
    [884, 1453, 84, 84], 
    [970, 1453, 84, 84], 
    [884, 1539, 84, 84], 
    [1056, 1453, 84, 84], 
    [970, 1539, 84, 84], 
    [884, 1625, 84, 84], 
    [1056, 1539, 84, 84], 
    [970, 1625, 84, 84], 
    [884, 1711, 84, 84], 
    [1056, 1625, 84, 84], 
    [2, 833, 746, 55], 
    [1441, 319, 64, 66], 
    [1156, 885, 64, 66], 
    [1156, 953, 63, 66], 
    [970, 1711, 84, 84], 
    [1056, 1711, 84, 84], 
    [884, 1797, 84, 84], 
    [970, 1797, 84, 84], 
    [1056, 1797, 84, 84], 
    [894, 1883, 84, 84], 
    [980, 1883, 84, 84], 
    [1066, 1883, 84, 84], 
    [1239, 1407, 84, 84], 
    [310, 1157, 219, 37], 
    [551, 893, 234, 42], 
    [1325, 1407, 84, 84], 
    [1411, 1407, 84, 84], 
    [1497, 1407, 84, 84], 
    [1153, 1435, 84, 84]
],
"animations": {
    
        "acorn":[0], 
        "acorn_2":[1], 
        "alarmclock":[2], 
        "alarmclock_2":[3], 
        "alarmclock_3":[4], 
        "alarmclock_4":[5], 
        "apple":[6], 
        "apple_2":[7], 
        "apple_3":[8], 
        "backpack":[9], 
        "backpack_2":[10], 
        "backpack_3":[11], 
        "backpack_4":[12], 
        "banana":[13], 
        "baseballbat":[14], 
        "basketball":[15], 
        "beachball":[16], 
        "beachball_2":[17], 
        "beachball_3":[18], 
        "beachball_4":[19], 
        "bell":[20], 
        "bell_2":[21], 
        "bell_3":[22], 
        "bone":[23], 
        "boomerang":[24], 
        "boomerang_2":[25], 
        "bowlingpin":[26], 
        "bowlingpin_2":[27], 
        "bowlingpin_3":[28], 
        "bowtie":[29], 
        "bowtie_2":[30], 
        "bowtie_3":[31], 
        "bowtie_4":[32], 
        "bread":[33], 
        "bubble_big":[34], 
        "bubble_central":[35], 
        "bubble_legend":[36], 
        "bubble_small":[37], 
        "bubble_tube":[38], 
        "bubble_tube_cropped":[39], 
        "bucket":[40], 
        "bucket_2":[41], 
        "bucket_3":[42], 
        "bucket_4":[43], 
        "butterfly":[44], 
        "butterfly_2":[45], 
        "butterfly_3":[46], 
        "butterfly_4":[47], 
        "button_finish":[48], 
        "button_start":[49], 
        "cake":[50], 
        "cake_2":[51], 
        "cake_3":[52], 
        "camera":[53], 
        "cap":[54], 
        "cap_2":[55], 
        "cap_3":[56], 
        "cap_4":[57], 
        "carrot":[58], 
        "cheese":[59], 
        "cheese_2":[60], 
        "cheese_3":[61], 
        "chesspiece":[62], 
        "chesspiece_2":[63], 
        "compass":[64], 
        "compass_2":[65], 
        "compass_3":[66], 
        "compass_4":[67], 
        "cookie":[68], 
        "cookie_2":[69], 
        "corn":[70], 
        "dice":[71], 
        "dice_2":[72], 
        "dice_3":[73], 
        "dice_4":[74], 
        "drawingpin":[75], 
        "drawingpin_2":[76], 
        "drawingpin_3":[77], 
        "drawingpin_4":[78], 
        "egg":[79], 
        "endgame_bronze":[80], 
        "endgame_bubble":[81], 
        "endgame_div":[82], 
        "endgame_gold":[83], 
        "endgame_silver":[84], 
        "endgame_starburst":[85], 
        "fish":[86], 
        "fish_2":[87], 
        "fish_3":[88], 
        "fish_4":[89], 
        "flipflop":[90], 
        "flipflop_2":[91], 
        "flipflop_3":[92], 
        "flipflop_4":[93], 
        "flower":[94], 
        "flower_2":[95], 
        "flower_3":[96], 
        "flower_4":[97], 
        "grapes":[98], 
        "grapes_2":[99], 
        "hotdog":[100], 
        "icon_close":[101], 
        "icon_instructions":[102], 
        "icon_legend":[103], 
        "icon_legend_green":[104], 
        "icon_sound_off":[105], 
        "icon_sound_on":[106], 
        "l10":[107], 
        "l100":[108], 
        "l15":[109], 
        "l2":[110], 
        "l20":[111], 
        "l200":[112], 
        "l25":[113], 
        "l4":[114], 
        "l40":[115], 
        "l400":[116], 
        "l5":[117], 
        "l5000":[118], 
        "l50000":[119], 
        "l60":[120], 
        "l9":[121], 
        "lacorn":[122], 
        "lalarmclock":[123], 
        "lantern":[124], 
        "lantern_2":[125], 
        "lantern_3":[126], 
        "lantern_4":[127], 
        "lapple":[128], 
        "lbackpack":[129], 
        "lbanana":[130], 
        "lbaseballbat":[131], 
        "lbasketball":[132], 
        "lbeachball":[133], 
        "lbell":[134], 
        "lbone":[135], 
        "lboomerang":[136], 
        "lbowlingpin":[137], 
        "lbowtie":[138], 
        "lbread":[139], 
        "lbucket":[140], 
        "lbutterfly":[141], 
        "lcake":[142], 
        "lcamera":[143], 
        "lcap":[144], 
        "lcarrot":[145], 
        "lcheese":[146], 
        "lchesspiece":[147], 
        "lcompass":[148], 
        "lcookie":[149], 
        "lcorn":[150], 
        "ldice":[151], 
        "ldrawingpin":[152], 
        "leaf":[153], 
        "leaf_2":[154], 
        "leaf_3":[155], 
        "leaf_4":[156], 
        "legend_div":[157], 
        "legend_tab":[158], 
        "legg":[159], 
        "lfish":[160], 
        "lflipflop":[161], 
        "lflower":[162], 
        "lgrapes":[163], 
        "lhotdog":[164], 
        "lightbulb":[165], 
        "lightbulb_2":[166], 
        "lipstick":[167], 
        "lipstick_2":[168], 
        "llantern":[169], 
        "lleaf":[170], 
        "llightbulb":[171], 
        "llipstick":[172], 
        "llollipop":[173], 
        "lmagnifyingglass":[174], 
        "lmug":[175], 
        "lmushroom":[176], 
        "lnotebook":[177], 
        "logo":[178], 
        "lollipop":[179], 
        "lollipop_2":[180], 
        "lollipop_3":[181], 
        "lollipop_4":[182], 
        "lovenglove":[183], 
        "lpaperplane":[184], 
        "lpear":[185], 
        "lpeg":[186], 
        "lpen":[187], 
        "lpizza":[188], 
        "lpoloshirt":[189], 
        "lring":[190], 
        "lrubberduck":[191], 
        "lrubberring":[192], 
        "lrugbyball":[193], 
        "lsafetypin":[194], 
        "lsandcastle":[195], 
        "lsandwich":[196], 
        "lsaucepan":[197], 
        "lshell":[198], 
        "lshoe":[199], 
        "lshorts":[200], 
        "lsmartphone":[201], 
        "lsock":[202], 
        "lstar":[203], 
        "ltambourine":[204], 
        "lteapot":[205], 
        "ltent":[206], 
        "ltoaster":[207], 
        "ltorch":[208], 
        "ltree":[209], 
        "ltyre":[210], 
        "lw10":[211], 
        "lw100":[212], 
        "lw15":[213], 
        "lw2":[214], 
        "lw20":[215], 
        "lw200":[216], 
        "lw25":[217], 
        "lw4":[218], 
        "lw40":[219], 
        "lw400":[220], 
        "lw5":[221], 
        "lw5000":[222], 
        "lw50000":[223], 
        "lw60":[224], 
        "lw9":[225], 
        "lwhistle":[226], 
        "magnifyingglass":[227], 
        "magnifyingglass_2":[228], 
        "magnifyingglass_3":[229], 
        "mug":[230], 
        "mug_2":[231], 
        "mug_3":[232], 
        "mug_4":[233], 
        "mushroom":[234], 
        "mushroom_2":[235], 
        "notebook":[236], 
        "notebook_2":[237], 
        "notebook_3":[238], 
        "notebook_4":[239], 
        "ovenglove":[240], 
        "ovenglove_2":[241], 
        "ovenglove_3":[242], 
        "ovenglove_4":[243], 
        "overlay_instructions":[244], 
        "paperplane":[245], 
        "pear":[246], 
        "peg":[247], 
        "peg_2":[248], 
        "peg_3":[249], 
        "peg_4":[250], 
        "pen":[251], 
        "pen_2":[252], 
        "pen_3":[253], 
        "pizza":[254], 
        "poloshirt":[255], 
        "poloshirt_2":[256], 
        "poloshirt_3":[257], 
        "poloshirt_4":[258], 
        "pound":[259], 
        "ring":[260], 
        "ring_2":[261], 
        "ring_3":[262], 
        "ring_4":[263], 
        "rubberduck":[264], 
        "rubberduck_2":[265], 
        "rubberduck_3":[266], 
        "rubberring":[267], 
        "rubberring_2":[268], 
        "rubberring_3":[269], 
        "rubberring_4":[270], 
        "rugbyball":[271], 
        "safetypin":[272], 
        "sandcastle":[273], 
        "sandwich":[274], 
        "saucepan":[275], 
        "saucepan_2":[276], 
        "saucepan_3":[277], 
        "saucepan_4":[278], 
        "shell":[279], 
        "shell_2":[280], 
        "shell_3":[281], 
        "shoe":[282], 
        "shoe_2":[283], 
        "shoe_3":[284], 
        "shoe_4":[285], 
        "shorts":[286], 
        "shorts_2":[287], 
        "shorts_3":[288], 
        "shorts_4":[289], 
        "smartphone":[290], 
        "smartphone_2":[291], 
        "sock":[292], 
        "sock_2":[293], 
        "sock_3":[294], 
        "sock_4":[295], 
        "star":[296], 
        "tambourine":[297], 
        "tambourine_2":[298], 
        "tambourine_3":[299], 
        "teapot":[300], 
        "teapot_2":[301], 
        "teapot_3":[302], 
        "teapot_4":[303], 
        "tent":[304], 
        "tent_2":[305], 
        "tent_3":[306], 
        "tent_4":[307], 
        "timer_bubble_container":[308], 
        "timer_trophies_bronze":[309], 
        "timer_trophies_gold":[310], 
        "timer_trophies_silver":[311], 
        "toaster":[312], 
        "toaster_2":[313], 
        "toaster_3":[314], 
        "torch":[315], 
        "torch_2":[316], 
        "torch_3":[317], 
        "torch_4":[318], 
        "tree":[319], 
        "tyre":[320], 
        "viewprizetable":[321], 
        "viewtable":[322], 
        "whistle":[323], 
        "whistle_2":[324], 
        "whistle_3":[325], 
        "whistle_4":[326]
}
    };
    MasterSS.ss = new createjs.SpriteSheet(MasterSS.spriteSheet);
    
    //private method
    iwg._class("iwg.lib.flassets.MasterSS", MasterSS);

}(window));
