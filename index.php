<?php include("./includes/header.php") ?>
	
	<section>
		<article id="background">
			<div id="content-container">	
				<h1>About Us</h1>
				<ul id="breadcrumbs">
					<li>
						<a href="index.php">Home</a>
					</li>
					<span>/</span>
					<li>
						<p>
							About Us
						</p>
					</li>
				</ul>
				<div id="screenshot-container">
					<?php 
						include("./includes/content.php");
					?>
				</div>
		</article>
		<img class="background-img-crop" src="imgs/buildings.png" alt="">
	</section>
	
<?php include("./includes/footer.php") ?>