
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
<!--    <title>Visualizing the housing bubble and crash • a hack of a hacker</title>-->
    <title>maps</title>
<!--    <meta name="description" content="D3.js is fun; housing bubbles are not.">-->
<!--    <meta name="keywords" content="d3, data science, data visualization, housing bubble, great recession, interactive map, cartography, js">-->
<!---->
<!---->
<!--    <!-- Twitter Cards -->-->
<!--    <meta name="twitter:title" content="Visualizing the housing bubble and crash">-->
<!--    <meta name="twitter:description" content="D3.js is fun; housing bubbles are not.">-->



<!--    <meta name="twitter:card" content="summary">-->
    <meta name="twitter:image" content="images/gggraph_crop.jpeg">

    <!-- Open Graph -->
<!--    <meta property="og:locale" content="">-->
<!--    <meta property="og:type" content="article">-->
<!--    <meta property="og:title" content="Visualizing the housing bubble and crash">-->
<!--    <meta property="og:description" content="D3.js is fun; housing bubbles are not.">-->
<!--    <meta property="og:url" content="http://aarongonzales.net/posts/nerd/2016/06/20/housing/">-->
<!--    <meta property="og:site_name" content="a hack of a hacker">-->
<!---->
<!--    <link rel="canonical" href="http://aarongonzales.net/posts/nerd/2016/06/20/housing/">-->
    <link href='https://fonts.googleapis.com/css?family=Crimson+Text' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="//cdn.jsdelivr.net/font-hack/2.019/css/hack.min.css" type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Bitter:400italic' rel='stylesheet' type='text/css'>


<!--    <link href="http://aarongonzales.net/atom.xml" type="application/atom+xml" rel="alternate" title="a hack of a hacker Atom Feed">-->
    <link href="atom.xml" type="application/atom+xml" rel="alternate" title="a hack of a hacker Atom Feed">
    <link href="sitemap.xml" type="application/xml" rel="sitemap" title="Sitemap">

    <meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="cleartype" content="on">

    <link rel="stylesheet" href="css/main.css">
    <!-- HTML5 Shiv and Media Query Support for IE -->
    <!--[if lt IE 9]>
    <script src="js/vendor/html5shiv.min.js"></script>
    <script src="js/vendor/respond.min.js"></script>
    <![endif]-->

</head>

<body id="js-body">
<!--[if lt IE 9]><div class="upgrade notice-warning"><strong>Your browser is quite old!</strong> Why not <a href="http://whatbrowser.org/">upgrade to a newer one</a> to better enjoy this site?</div><![endif]-->

<!--<header id="masthead">-->
<!---->
<!---->
<!--    <div class="inner-wrap">-->
<!--        <a href="http://aarongonzales.net/" class="site-title">a hack of a hacker</a>-->
<!--        <nav role="navigation" class="menu top-menu">-->
<!--            <ul class="menu-item">-->
<!--                <li class="home"><a href="/">a hack of a hacker</a></li>-->
<!---->
<!---->
<!---->
<!---->
<!--                <li><a href="http://aarongonzales.net/posts/" >Posts</a></li>-->
<!---->
<!---->
<!---->
<!---->
<!--                <li><a href="http://aarongonzales.net/about/" >About</a></li>-->
<!---->
<!--            </ul>-->
<!---->
<!--        </nav>-->
<!--    </div><!-- /.inner-wrap -->-->
<!--</header><!-- /.masthead -->-->
<!---->
<!--<nav role="navigation" id="js-menu" class="sliding-menu-content">-->
<!--    <h5>a hack of a hacker <span>Table of Contents</span></h5>-->
<!--    <ul class="menu-item">-->
<!--        <li>-->
<!--            <a href="http://aarongonzales.net/posts/">-->
<!--                <img src="http://aarongonzales.net/images/clouds.jpg" alt="teaser" class="teaser">-->
<!--                <div class="title">Posts</div>-->
<!--                <p class="excerpt">Writing, coursework, reports, and projects</p>-->
<!--            </a>-->
<!--        </li><li>-->
<!--            <a href="http://aarongonzales.net/about/">-->
<!--                <img src="http://aarongonzales.net/images/avatar_long.jpg" alt="teaser" class="teaser">-->
<!--                <div class="title">About</div>-->
<!--                <p class="excerpt">I'm a regular guy, except when I'm not. Learn more about me here.</p>-->
<!--            </a>-->
<!--        </li><li>-->
<!--            <a href="http://aarongonzales.net/portfolio/">-->
<!--                <img src="http://aarongonzales.net/images/blog/decision_tree_teaser.png" alt="teaser" class="teaser">-->
<!--                <div class="title">Portfolio</div>-->
<!--                <p class="excerpt">A smattering of my work</p>-->
<!--            </a>-->
<!--        </li><li>-->
<!--            <a href="http://aarongonzales.net/coursework/">-->
<!--                <img src="http://aarongonzales.net/images/ethereal.jpg" alt="teaser" class="teaser">-->
<!--                <div class="title">Coursework</div>-->
<!--                <p class="excerpt">Stuff from my courses that may be useful to someone</p>-->
<!--            </a>-->
<!--        </li><li>-->
<!--            <a href="http://aarongonzales.net/research/">-->
<!--                <img src="http://aarongonzales.net/images/blog/fb_clusters_teaser.jpg" alt="teaser" class="teaser">-->
<!--                <div class="title">Research</div>-->
<!--                <p class="excerpt">Research updates and commentary</p>-->
<!--            </a>-->
<!--        </li><li>-->
<!--            <a href="http://aarongonzales.net/friends/">-->
<!--                <img src="http://aarongonzales.net/images/blog/fb_network_long.jpg" alt="teaser" class="teaser">-->
<!--                <div class="title">Friends</div>-->
<!--                <p class="excerpt">People whom I follow or like</p>-->
<!--            </a>-->
<!--        </li>-->
<!--    </ul>-->
<!--</nav>-->
<!--<button type="button" id="js-menu-trigger" class="sliding-menu-button lines-button x2" role="button" aria-label="Toggle Navigation">-->
<!--    <span class="nav-lines"></span>-->
<!--</button>-->

<div id="js-menu-screen" class="menu-screen"></div>


<div id="page-wrapper">
    <div id="main" role="main">
        <article class="wrap" itemscope itemtype="http://schema.org/Article">


            <nav class="breadcrumbs">
    <span itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
      <a href="http://aarongonzales.net" itemprop="url">
        <span itemprop="title">Home</span>
      </a> › 
    <span itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
      <a href="http://aarongonzales.net/posts/" itemprop="url">
        <span itemprop="title">Posts</span>
      </a>
    </span>
            </nav><!-- /.breadcrumbs -->

            <div class="page-title">
                <h1>Visualizing the housing bubble and crash</h1>
            </div>
            <div class="inner-wrap">
                <nav class="toc"></nav><!-- /.toc -->
                <div id="content" class="page-content" itemprop="articleBody">
                    <link rel="stylesheet" href="/resources/housing_style.css">

                    <script type="text/javascript" src="http://d3js.org/d3.v3.min.js"></script>
                    <script type="text/javascript" src="http://d3js.org/queue.v1.min.js"></script>
                    <script type="text/javascript" src="http://d3js.org/topojson.v1.min.js"></script>
                    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.10.0/d3-legend.js"></script>
                    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>


                    <p class="notice-info">
                        <strong>Content Warning:</strong>
                        d3, data science, data visualization, housing bubble, great recession
                    </p>


                    <br>
                    <br>


                    <div id="map"></div>


                    <script type="text/javascript" src="/resources/housing_map.js"></script>

                    <hr />
<!--                    <footer class="page-footer">-->
<!---->
<!---->
<!---->
<!--                        <div class="author-image">-->
<!--                            <img src="http://aarongonzales.net/images/avatar.jpg" alt="Aaron Gonzales">-->
<!--                        </div><!-- ./author-image -->-->
<!--                        <div class="author-content">-->
<!--                            <h3 class="author-name" >Written by <span itemprop="author">Aaron Gonzales</span></h3>-->
<!--                            <p class="author-bio">I'm a typically atypical guy.</p>-->
<!--                        </div><!-- ./author-content -->-->
<!--                        <div class="inline-btn">-->
<!--                            <a class="btn-social twitter" href="https://twitter.com/intent/tweet?text=Visualizing%20the%20housing%20bubble%20and%20crash&amp;url=http://aarongonzales.net/posts/nerd/2016/06/20/housing/&amp;via=" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i> Share on Twitter</a>-->
<!--                            <a class="btn-social facebook" href="https://www.facebook.com/sharer/sharer.php?u=http://aarongonzales.net/posts/nerd/2016/06/20/housing/" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i> Share on Facebook</a>-->
<!--                            <a class="btn-social google-plus"  href="https://plus.google.com/share?url=http://aarongonzales.net/posts/nerd/2016/06/20/housing/" target="_blank"><i class="fa fa-google-plus" aria-hidden="true"></i> Share on Google+</a>-->
<!--                        </div><!-- /.share-this -->-->
<!--                        <div class="page-meta">-->
<!--                            <p>Updated <time datetime="2016-06-20T00:00:00Z" itemprop="datePublished">June 20, 2016</time></p>-->
<!--                        </div><!-- /.page-meta -->-->
<!--                    </footer><!-- /.footer -->-->
                    <aside>

                        <div id="disqus_thread"></div>
                        <script type="text/javascript">
                            /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
                            var disqus_shortname = 'hackofahacker'; // required: replace example with your forum shortname

                            /* * * DON'T EDIT BELOW THIS LINE * * */
                            (function() {
                                var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                                dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
                                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                            })();
                        </script>
                        <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
                        <a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>

                    </aside>
                </div><!-- /.content -->
            </div><!-- /.inner-wrap -->

        </article><!-- ./wrap -->
    </div><!-- /#main -->

    <footer role="contentinfo" id="site-footer">
        <nav role="navigation" class="menu bottom-menu">
            <ul class="menu-item">




                <li><a href="http://aarongonzales.net/" >Home</a></li>




                <li><a href="http://aarongonzales.net/contact" >Contact</a></li>

            </ul>
        </nav><!-- /.bottom-menu -->
        <p class="copyright">&#169; 2016 <a href="http://aarongonzales.net">a hack of a hacker</a> powered by <a href="http://jekyllrb.com" rel="nofollow">Jekyll</a> + <a href="http://mmistakes.github.io/skinny-bones-jekyll/" rel="nofollow">Skinny Bones</a>.</p>

        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-11008365-1', 'auto');
            ga('send', 'pageview');

        </script>
    </footer>

</div>

<script src="http://aarongonzales.net/js/vendor/jquery-1.9.1.min.js"></script>
<script src="http://aarongonzales.net/js/main.js"></script>
<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"> </script>
<link rel="stylesheet" href="/css/styles/custom.css">
<script src="/css/highlight.pack.js"></script>
<script>hljs.initHighlightingOnLoad();</script>

</body>

</html>
