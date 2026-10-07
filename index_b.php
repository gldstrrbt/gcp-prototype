<?php include("./includes/header.php") ?>
	<section>
		<article id="background">
			<div id="content-container">	
				<h1>About Us</h1>
				<!-- <h1>Management Team</h1> -->
				<ul>
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
						// include("includes/screenshot-b.php");
					?>
				</div>
				<script>
					alert("asdf");
				</script>
		</article>
		<!-- <img class="background-img-crop" src="imgs/nyc.jpg" alt=""> -->
		<img class="background-img-crop" src="imgs/buildings.png" alt="">
	</section>
<!-- 	<section id="background-option-b">
		<img class="background-image-b" src="imgs/nyc.jpg" alt="">
		<img class="background-image-c" src="imgs/nyc.jpg" alt="">
	</section> -->
<?php include("./includes/footer.php") ?>