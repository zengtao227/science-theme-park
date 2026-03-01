/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

const i18nPaths = [
    '/Users/zengtao/Doc/My code/science-theme-park/src/lib/i18n/en/math.ts',
    '/Users/zengtao/Doc/My code/science-theme-park/src/lib/i18n/cn/math.ts',
    '/Users/zengtao/Doc/My code/science-theme-park/src/lib/i18n/de/math.ts'
];

i18nPaths.forEach(p => {
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf-8');

    // Fix sm2_01 mode definitions
    content = content.replace(/mode_1: "([^"]*)\(a\+b\)\^\{2\}"/, 'mode_1: "$1$(a+b)^{2}$"');
    content = content.replace(/mode_2: "([^"]*)\(a-b\)\^\{2\}"/, 'mode_2: "$1$(a-b)^{2}$"');
    // Handle already wrapped ones to not double-wrap
    content = content.replace(/\$\$\(a\+b\)\^\{2\}\$\$/g, '$(a+b)^{2}$');
    content = content.replace(/\$\$\(a-b\)\^\{2\}\$\$/g, '$(a-b)^{2}$');

    content = content.replace(/a2: "(a\^\{2\}|\$a\^\{2\}\$)"/, 'a2: "$a^{2}$"');
    content = content.replace(/b2: "(b\^\{2\}|\$b\^\{2\}\$)"/, 'b2: "$b^{2}$"');
    content = content.replace(/ab: "(ab|\$ab\$)"/, 'ab: "$ab$"');
    content = content.replace(/target_plus: "(\(a\+b\)\^\{2\}|\$\(a\+b\)\^\{2\}\$)"/, 'target_plus: "$(a+b)^{2}$"');
    content = content.replace(/target_minus: "(\(a-b\)\^\{2\}|\$\(a-b\)\^\{2\}\$)"/, 'target_minus: "$(a-b)^{2}$"');


    // CN replacement
    if (p.includes('cn')) {
        content = content.replace(/用 \(a\+b\)\^\{2\} = a\^\{2\} \+ 2ab \+ b\^\{2\} 计算/, '用 $(a+b)^{2} = a^{2} + 2ab + b^{2}$ 计算');
        content = content.replace(/\(a\+b\)\^\{2\} = a\^\{2\} \+ 2ab \+ b\^\{2\} = 10000 \+ 600 \+ 9 = 10609/, '$(a+b)^{2} = a^{2} + 2ab + b^{2} = 10000 + 600 + 9 = 10609$');
        content = content.replace(/差的公式 \(a\+b\)\(a-b\) = a\^\{2\} - b\^\{2\}/, '差的公式 $(a+b)(a-b) = a^{2} - b^{2}$');
        content = content.replace(/大正方形 \(a\^\{2\}\)/, '大正方形 ($a^{2}$)');
        content = content.replace(/各 a×b/, '各 $a\\times b$');
        content = content.replace(/小正方形 \(b\^\{2\}\)/, '小正方形 ($b^{2}$)');
        content = content.replace(/边长为 \(a\+b\)/, '边长为 $(a+b)$');
        content = content.replace(/拆成 \(整数 \+ 零头\)\^\{2\}/, '拆成 $(\\text{整数} + \\text{零头})^{2}$');
        content = content.replace(/拆成 \(整数 ± 零头\)/, '拆成 $(\\text{整数} \\pm \\text{零头})$');
        content = content.replace(/转化为 \(Base\+N\)\^\{2\}/, '转化为 $(\\text{Base}+N)^{2}$');
        content = content.replace(/使用二项式展开 \(a±b\)\^\{2\} 简化计算/, '使用二项式展开 $(a\\pm b)^{2}$ 简化计算');

        // speedster hint about sqrt 
        content = content.replace(/a\^\{2\} \+ 2ab \+ b\^\{2\}/g, '$a^{2} + 2ab + b^{2}$');
        content = content.replace(/角上的 b\^\{2\}/, '角上的 $b^{2}$');
        content = content.replace(/103\^\{2\} 或 47\^\{2\}/, '$103^{2}$ 或 $47^{2}$');
        content = content.replace(/103×103/, '$103\\times 103$');

        // fix text=a,b variables
        content = content.replace(/一块边长 a，另一块边长 b/g, '一块边长 $a$，另一块边长 $b$');
        content = content.replace(/识别 a 和 b/g, '识别 $a$ 和 $b$');
        content = content.replace(/线段 a 和 b/g, '线段 $a$ 和 $b$');
        content = content.replace(/面积 (a\+b)\^2/, '面积 $(a+b)^2$');
        content = content.replace(/填满目标区域 \$\(a\+b\)\^\{2\}\$/g, '填满目标区域 $(a+b)^{2}$');
        content = content.replace(/提取根 \(a\)/g, '提取根 $(a)$');
        content = content.replace(/校验一次项 \(2ab\)/g, '校验一次项 $(2ab)$');

        content = content.replace(/A\^\{2\} \+ B\^\{2\} 的液体如何精准填满 C\^\{2\}/g, '$A^{2} + B^{2}$ 的液体如何精准填满 $C^{2}$');

    } else if (p.includes('en')) {
        content = content.replace(/formula \(a\+b\)\(a-b\) = a\^\{2\} - b\^\{2\}/, 'formula $(a+b)(a-b) = a^{2} - b^{2}$');
        content = content.replace(/area with \(a\+b\)\^\{2\} = a\^\{2\} \+ 2ab \+ b\^\{2\}/, 'area with $(a+b)^{2} = a^{2} + 2ab + b^{2}$');
        content = content.replace(/identify a and b/, 'identify $a$ and $b$');
        content = content.replace(/large square \(a\^\{2\}\)/, 'large square ($a^{2}$)');
        content = content.replace(/each a×b/, 'each $a\\times b$');
        content = content.replace(/small square \(b\^\{2\}\)/, 'small square ($b^{2}$)');
        content = content.replace(/square of side \(a\+b\)/, 'square of side $(a+b)$');
        content = content.replace(/into \(Round \+ Remainder\)\^\{2\}/, 'into $(\\text{Round} + \\text{Remainder})^{2}$');
        content = content.replace(/into \(Round ± Remainder\)/, 'into $(\\text{Round} \\pm \\text{Remainder})$');
        content = content.replace(/framework of \(Base\+N\)\^\{2\}/, 'framework of $(\\text{Base}+N)^{2}$');
        content = content.replace(/expansion \(a±b\)\^\{2\} to/, 'expansion $(a\\pm b)^{2}$ to');
        content = content.replace(/a\^\{2\} \+ 2ab \+ b\^\{2\}/g, '$a^{2} + 2ab + b^{2}$');
        content = content.replace(/corner b\^\{2\}/, 'corner $b^{2}$');
        content = content.replace(/103\^\{2\} or 47\^\{2\}/, '$103^{2}$ or $47^{2}$');
        content = content.replace(/103×103/, '$103\\times 103$');
        content = content.replace(/side 'a'/g, "side $a$");
        content = content.replace(/side 'b'/g, "side $b$");
        content = content.replace(/fill the target area \$\(a\+b\)\^\{2\}\$/, 'fill the target area $(a+b)^{2}$');

        // Pythagoras
        content = content.replace(/how A\^\{2\} \+ B\^\{2\} perfectly fill C\^\{2\}/, 'how $A^{2} + B^{2}$ perfectly fill $C^{2}$');
    } else if (p.includes('de')) {
        content = content.replace(/in \(Runde \+ Rest\)\^\{2\}/, 'in $(\\text{Runde} + \\text{Rest})^{2}$');
        content = content.replace(/in \(Runde ± Rest\)/, 'in $(\\text{Runde} \\pm \\text{Rest})$');
        content = content.replace(/Rahmen von \(Base\+N\)\^\{2\}/, 'Rahmen von $(\\text{Base}+N)^{2}$');
        content = content.replace(/Seitenlänge a /g, 'Seitenlänge $a$ ');
        content = content.replace(/andere b/g, 'andere $b$');
        content = content.replace(/die dritte binomische Formel/, 'die dritte binomische Formel $(a+b)(a-b) = a^{2} - b^{2}$');
    }

    // Placeholder cleanup for all
    content = content.replace(/a_squared: "a\^\{2\}"/, 'a_squared: "a²"');
    content = content.replace(/b_squared: "b\^\{2\}"/, 'b_squared: "b²"');
    content = content.replace(/v_squared: "V\^\{2\}"/, 'v_squared: "V²"');
    content = content.replace(/a_squared: "\\$a\^\{2\}\\$"/, 'a_squared: "a²"');

    fs.writeFileSync(p, content);
});

// Let's fix S201 page again for the target format rendering which might be broken
const page201File = '/Users/zengtao/Doc/My code/science-theme-park/src/app/chamber/sm2-01/page.tsx';
let page201 = fs.readFileSync(page201File, 'utf-8');

// The elite tips target formatting (user complained: 目标格式： (4xy−9)2 )
page201 = page201.replace(/<span className="text-white\/40 text-\[10px\]">\{sm2_01_t\.elite_tips_target\}<\/span>\s*<span className="text-white font-black ml-2 text-sm">(.*?)<\/span>/g,
    '<span className="text-white/40 text-[10px]">{sm2_01_t.elite_tips_target}</span> <span className="text-white font-black ml-2 text-sm pr-2">{renderMixedText(scrapperQuest?.subType === "FACTOR" ? "(4xy - 9)^{2}" : "(a+b)^{2}")}</span>');

// User string: "• \sqrt16=4, \quad \sqrt81=9"
// Check if the user text is literally inside the page, if so fix:
page201 = page201.replace(/• \\\\sqrt16=4, \\\\quad \\\\sqrt81=9/g, '• $\\sqrt{16}=4, \\quad \\sqrt{81}=9$');
page201 = page201.replace(/• \\sqrt16=4, \\quad \\sqrt81=9/g, '• $ \\sqrt{16}=4, \\quad \\sqrt{81}=9 $');

fs.writeFileSync(page201File, page201);
console.log('Done script');
