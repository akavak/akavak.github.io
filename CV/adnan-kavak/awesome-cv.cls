%% Start of file `awesome-cv.cls'.
% Awesome CV Class File (academic edition)
%
% Based on Awesome-CV by Claud D. Park <posquit0.bj@gmail.com> (LPPL v1.3c).
% Adapted for an academic CV: top-aligned entry tables (no vertical centring,
% no negative-space hacks), consistent hanging indents, left-aligned
% subsections, an honours layout with a fixed date column, and a numbered
% publication list with a constant label width.
%
% Compile with XeLaTeX, LuaLaTeX or Tectonic.

%-------------------------------------------------------------------------------
%                Identification
%-------------------------------------------------------------------------------
\ProvidesClass{awesome-cv}[2026/11/20 v2.0.0 Awesome CV, academic edition]
\NeedsTeXFormat{LaTeX2e}

\RequirePackage{iftex}

\DeclareOption{draft}{\setlength\overfullrule{5pt}}
\DeclareOption{final}{\setlength\overfullrule{0pt}}
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{article}}
\ProcessOptions\relax
\LoadClass{article}

%-------------------------------------------------------------------------------
%                Packages
%-------------------------------------------------------------------------------
\RequirePackage{array}
\RequirePackage{tabularx}
\RequirePackage{enumitem}
\RequirePackage{ragged2e}
\RequirePackage{geometry}
\RequirePackage{fancyhdr}
\RequirePackage{xcolor}
\RequirePackage{xifthen}
\RequirePackage{xstring}
\RequirePackage{etoolbox}
\RequirePackage{setspace}
\RequirePackage{qrcode}
\RequirePackage{lastpage}
\RequirePackage{needspace}

\RequirePackage[quiet]{fontspec}
\defaultfontfeatures{Ligatures=TeX}

% Fonts are loaded by file name from the OTF files shipped with the TeX
% `sourcesanspro` and `roboto` packages, so every weight (including Light)
% resolves identically in Tectonic, TeX Live, MacTeX, MiKTeX and Overleaf.
\IfFontExistsTF{SourceSansPro-Regular.otf}{%
  \setmainfont{SourceSansPro}[Extension=.otf, UprightFont=*-Regular, ItalicFont=*-RegularIt,
    BoldFont=*-Bold, BoldItalicFont=*-BoldIt,
    FontFace={l}{n}{*-Light}, FontFace={l}{it}{*-LightIt},
    FontFace={sb}{n}{*-Semibold}, FontFace={sb}{it}{*-SemiboldIt}]%
  \setsansfont{SourceSansPro}[Extension=.otf, UprightFont=*-Regular, ItalicFont=*-RegularIt,
    BoldFont=*-Bold, BoldItalicFont=*-BoldIt,
    FontFace={l}{n}{*-Light}, FontFace={l}{it}{*-LightIt},
    FontFace={sb}{n}{*-Semibold}, FontFace={sb}{it}{*-SemiboldIt}]%
}{%
  \RequirePackage[default]{sourcesanspro}%
}

\IfFontExistsTF{Roboto-Regular.otf}{%
  \newfontfamily\roboto{Roboto}[Extension=.otf, UprightFont=*-Regular, ItalicFont=*-Italic,
    BoldFont=*-Bold, BoldItalicFont=*-BoldItalic,
    FontFace={l}{n}{*-Light}, FontFace={l}{it}{*-LightItalic}]%
}{%
  \RequirePackage{roboto}%
  \newcommand*{\roboto}{\robotofamily}%
}

\RequirePackage{fontawesome5}
\RequirePackage{parskip}
\RequirePackage[hidelinks,unicode,pdfpagelabels=false]{hyperref}

%-------------------------------------------------------------------------------
%                Page layout
%-------------------------------------------------------------------------------
% Balanced A4 margins; the footer sits inside the bottom margin.
\geometry{a4paper, left=1.7cm, right=1.7cm, top=1.4cm, bottom=1.9cm, footskip=0.8cm, nohead}

\fancyhfoffset{0em}
\renewcommand{\headrulewidth}{0pt}
\fancyhf{}
\pagestyle{fancy}

% No paragraph indentation anywhere; vertical rhythm is set explicitly.
\setlength{\parindent}{0pt}
\setlength{\parskip}{0pt}
\setlength{\JustifyingParindent}{0pt}
\setlength{\RaggedRightParindent}{0pt}
\setlength{\RaggedLeftParindent}{0pt}
\raggedbottom

%-------------------------------------------------------------------------------
%                Colours
%-------------------------------------------------------------------------------
\definecolor{white}{HTML}{FFFFFF}
\definecolor{black}{HTML}{000000}
\definecolor{darkgray}{HTML}{333333}
\definecolor{gray}{HTML}{5D5D5D}
\definecolor{lightgray}{HTML}{999999}
\definecolor{darktext}{HTML}{1A1A1A}
\colorlet{text}{darktext}
\colorlet{graytext}{gray}
\colorlet{sectiondivider}{lightgray}

\definecolor{awesome-red}{HTML}{DC3522}
\definecolor{awesome-blue}{HTML}{2F5BD3}
\colorlet{awesome}{awesome-red}

\hypersetup{colorlinks=true, urlcolor=awesome-blue, linkcolor=awesome-blue, citecolor=awesome-blue}

\newbool{acvSectionColorHighlight}
\setbool{acvSectionColorHighlight}{true}

%-------------------------------------------------------------------------------
%                Fonts & styles
%-------------------------------------------------------------------------------
\newcommand*{\headerfont}{\roboto\selectfont}
\newcommand*{\footerfont}{\sffamily}
\newcommand*{\bodyfont}{\sffamily}
\newcommand*{\bodyfontlight}{\sffamily\fontseries{l}\selectfont}

\newcommand*{\headerfirstnamestyle}[1]{{\fontsize{30pt}{1em}\roboto\fontseries{l}\selectfont\color{black}#1}}
\newcommand*{\headerlastnamestyle}[1]{{\fontsize{30pt}{1em}\roboto\bfseries\color{black}#1}}
\newcommand*{\headerpositionstyle}[1]{{\fontsize{8pt}{1em}\bodyfont\scshape\color{awesome}#1}}
\newcommand*{\headeraddressstyle}[1]{{\fontsize{8pt}{1em}\roboto\itshape\color{darkgray}#1}}
\newcommand*{\headersocialstyle}[1]{{\fontsize{7.4pt}{1em}\roboto\color{awesome-blue}#1}}
\newcommand*{\footerstyle}[1]{{\fontsize{7.5pt}{1em}\footerfont\color{graytext}#1}}

\newcommand*{\sectionstyleface}[1]{{\fontsize{15pt}{1em}\bodyfont\bfseries #1}}
\newcommand*{\sectionstyle}[1]{%
  \def\@acvSectionTmp{#1}%
  \ifthenelse{\boolean{acvSectionColorHighlight}}{%
    \StrSplit{\@acvSectionTmp}{1}{\acvSectionStringAwesome}{\acvSectionStringPlain}%
    {\color{awesome}\sectionstyleface{\acvSectionStringAwesome}}%
    {\color{text}\sectionstyleface{\acvSectionStringPlain}}%
  }{%
    {\color{text}\sectionstyleface{\@acvSectionTmp}}%
  }%
}

\newcommand*{\paragraphstyle}{\fontsize{9.2pt}{12pt}\bodyfontlight\upshape\color{text}}
\newcommand*{\entrytitlestyle}[1]{{\fontsize{10pt}{12pt}\bodyfont\bfseries\color{darktext}#1}}
\newcommand*{\entrypositionstyle}[1]{{\fontsize{9pt}{11.5pt}\bodyfont\color{darktext}#1}}
\newcommand*{\entrydatestyle}[1]{{\fontsize{8.5pt}{11.5pt}\bodyfontlight\itshape\color{graytext}#1}}
\newcommand*{\entrylocationstyle}[1]{{\fontsize{9pt}{12pt}\bodyfontlight\itshape\color{awesome}#1}}
\newcommand*{\descriptionstyle}[1]{{\fontsize{9pt}{11.5pt}\bodyfontlight\upshape\color{text}#1}}
\newcommand*{\skilltypestyle}[1]{{\fontsize{9.2pt}{11.5pt}\bodyfont\bfseries\color{darktext}#1}}
\newcommand*{\skillsetstyle}[1]{{\fontsize{9pt}{11.5pt}\bodyfontlight\color{text}#1}}

%-------------------------------------------------------------------------------
%                Personal information
%-------------------------------------------------------------------------------
\newcommand*{\name}[2]{\def\@firstname{#1}\def\@lastname{#2}}
\newcommand*{\address}[1]{\def\@address{#1}}
\newcommand*{\position}[1]{\def\@position{#1}}
\newcommand*{\email}[1]{\def\@email{#1}}
\newcommand*{\mobile}[1]{\def\@mobile{#1}}
\newcommand*{\homepage}[1]{\def\@homepage{#1}}
\newcommand*{\linkedin}[1]{\def\@linkedin{#1}}
\newcommand*{\googlescholar}[1]{\def\@googlescholar{#1}}
\newcommand*{\orcid}[1]{\def\@orcid{#1}}

\newcommand{\acvHeaderSocialSep}{\enskip{\color{lightgray}\textbar}\enskip}
\newbool{acvIsStart}
\newcommand{\acvSocial}[1]{\ifbool{acvIsStart}{\setbool{acvIsStart}{false}}{\acvHeaderSocialSep}#1}

%-------------------------------------------------------------------------------
%                Header & footer
%-------------------------------------------------------------------------------
\newcommand*{\makecvheader}{%
  \begin{center}
    \headerfirstnamestyle{\@firstname}\headerlastnamestyle{~\@lastname}\par
    \vspace{2.2mm}%
    \ifthenelse{\isundefined{\@position}}{}{\headerpositionstyle{\@position}\par\vspace{1.6mm}}%
    \ifthenelse{\isundefined{\@address}}{}{\headeraddressstyle{\@address}\par\vspace{1.6mm}}%
    \headersocialstyle{%
      \setbool{acvIsStart}{true}%
      \ifthenelse{\isundefined{\@email}}{}{\acvSocial{\href{mailto:\@email}{\faEnvelope\ \@email}}}%
      \ifthenelse{\isundefined{\@mobile}}{}{\acvSocial{{\color{darktext}\faPhone*}\ {\color{darktext}\@mobile}}}%
      \ifthenelse{\isundefined{\@homepage}}{}{\acvSocial{\href{https://\@homepage}{\faGlobe\ \@homepage}}}%
      \ifthenelse{\isundefined{\@googlescholar}}{}{\acvSocial{\href{\@googlescholar}{\faGoogle\ Google Scholar}}}%
      \ifthenelse{\isundefined{\@orcid}}{}{\acvSocial{\href{https://orcid.org/\@orcid}{\faOrcid\ \@orcid}}}%
      \ifthenelse{\isundefined{\@linkedin}}{}{\acvSocial{\href{https://www.linkedin.com/in/\@linkedin}{\faLinkedin\ LinkedIn}}}%
    }\par
  \end{center}
  \vspace{-1mm}%
}

\newcommand*{\makecvfooter}[3]{%
  \fancyfoot{}%
  \fancyfoot[L]{\footerstyle{#1}}%
  \fancyfoot[C]{\footerstyle{#2}}%
  \fancyfoot[R]{\footerstyle{#3}}%
}

%-------------------------------------------------------------------------------
%                Sections
%-------------------------------------------------------------------------------
% Keeps the heading together with at least a few lines of content.
\newcommand{\cvsection}[1]{%
  \par\needspace{5\baselineskip}%
  \vspace{4.5mm}%
  {\sectionstyle{#1}\phantomsection\ {\color{sectiondivider}\leaders\hrule height 0.6pt\hfill\kern0pt}}\par
  \vspace{2.4mm}%
}

% Left-aligned subsection with a coloured first letter and an optional count.
\newcommand{\cvsubsection}[2][]{%
  \par\needspace{4\baselineskip}%
  \vspace{2.6mm}%
  {\fontsize{11pt}{1em}\bodyfont\bfseries\color{awesome}#2%
   \ifstrempty{#1}{}{\ {\color{graytext}\fontseries{l}\selectfont(#1)}}}\par
  \vspace{1.6mm}%
}

\newenvironment{cvparagraph}{\paragraphstyle\justifying}{\par}

%-------------------------------------------------------------------------------
%                Entries (education, positions, projects)
%-------------------------------------------------------------------------------
% \cventry{position}{title}{location}{date}{description}
% Two lines built from top-aligned parboxes: the left text and the right
% location/date never collide, and the only vertical space is set explicitly.
\newlength{\acvRightCol}
\setlength{\acvRightCol}{5.4cm}
\newlength{\acvGutter}
\setlength{\acvGutter}{0.4cm}
\newcommand*{\acvLeftRight}[2]{%
  \noindent\parbox[t]{\dimexpr\textwidth-\acvRightCol-\acvGutter\relax}{\raggedright#1}%
  \hspace{\acvGutter}%
  \parbox[t]{\acvRightCol}{\raggedleft#2}\par}
\newenvironment{cventries}{\par}{\par}
\newcommand*{\cventry}[5]{%
  \par\needspace{3\baselineskip}%
  \ifstrempty{#2}{}{\acvLeftRight{\entrytitlestyle{#2}}{\entrylocationstyle{#3}}\vspace{0.3mm}}%
  \acvLeftRight{\entrypositionstyle{#1}}{\entrydatestyle{#4}}%
  \ifstrempty{#5}{}{\vspace{0.5mm}\descriptionstyle{#5}\par}%
  \vspace{2.4mm}%
}

% Bulleted details with a fixed hanging indent.
\newenvironment{cvitems}{%
  \begin{itemize}[leftmargin=1.1em, labelsep=0.5em, itemsep=0.6mm, topsep=0.4mm, parsep=0pt, partopsep=0pt,
                  label={\color{awesome}\textbullet}]%
    \justifying
}{%
  \end{itemize}%
}

%-------------------------------------------------------------------------------
%                Honours & dated lists
%-------------------------------------------------------------------------------
% \cvhonor{title}{description}{location/organisation}{date}
% Fixed-width date column on the left; title and description form one block,
% so continuation lines align under the title rather than under the date.
\newlength{\acvDateCol}
\setlength{\acvDateCol}{2.3cm}
\newlength{\acvOrgCol}
\setlength{\acvOrgCol}{3.4cm}
\newenvironment{cvhonors}{\par}{\par}
\newcommand*{\cvhonor}[4]{%
  \par\needspace{2\baselineskip}%
  \noindent\parbox[t]{\acvDateCol}{\raggedright\entrydatestyle{#4}}%
  \parbox[t]{\dimexpr\textwidth-\acvDateCol-\acvOrgCol-\acvGutter\relax}{\raggedright
    \entrytitlestyle{#1}\ifstrempty{#2}{}{\par\vspace{0.3mm}\descriptionstyle{#2}}}%
  \hspace{\acvGutter}%
  \parbox[t]{\acvOrgCol}{\raggedleft\entrylocationstyle{#3}}\par
  \vspace{2.2mm}%
}

%-------------------------------------------------------------------------------
%                Skills / key-value table
%-------------------------------------------------------------------------------
\newlength{\acvSkillCol}
\setlength{\acvSkillCol}{4.0cm}
\newenvironment{cvskills}{\par}{\par\vspace{0.6mm}}
\newcommand*{\cvskill}[2]{%
  \noindent\parbox[t]{\acvSkillCol}{\raggedright\skilltypestyle{#1}}%
  \parbox[t]{\dimexpr\textwidth-\acvSkillCol\relax}{\raggedright\skillsetstyle{#2}}\par
  \vspace{1.4mm}}

%-------------------------------------------------------------------------------
%                Publications
%-------------------------------------------------------------------------------
% Numbered list with a constant label width: every label is right-aligned in
% the same box, so all entries share one clean hanging indent.
\newenvironment{cvpubs}{%
  \begin{itemize}[leftmargin=3.1em, labelwidth=2.6em, labelsep=0.5em, align=right,
                  itemsep=1.3mm, topsep=0.6mm, parsep=0pt, partopsep=0pt]%
    \fontsize{8.8pt}{11.2pt}\bodyfontlight\selectfont\color{text}\raggedright
}{%
  \end{itemize}%
}
\newcommand*{\pub}[2]{\item[{\fontsize{8.4pt}{11.2pt}\bodyfont\color{awesome}[#1]}]#2}
\newcommand*{\me}{\textbf{A. Kavak}}
\newcommand*{\pubtitle}[1]{{\bodyfont\color{darktext}“#1”}}
\newcommand*{\pubvenue}[1]{\textit{#1}}
\newcommand*{\pubtag}[1]{{\fontsize{7.2pt}{1em}\bodyfont\color{awesome}\,#1}}

\endinput
%% End of file `awesome-cv.cls'.
