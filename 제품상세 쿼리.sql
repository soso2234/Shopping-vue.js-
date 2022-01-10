SELECT 
	  t1.*
	, t2.category1
	, t2.category2
	, t2.category3
	, t3.path
FROM 
	  t_product t1
	, t_category t2
	, t_image t3
WHERE 1=1
AND t1.category_id 	= t2.id
AND t1.id 				= t3.product_id
AND t3.type 			= 1


SELECT 
	  t1.*
	, t2.category1
	, t2.category2
	, t2.category3
	, t3.path
FROM 
	  t_product t1
	, t_category t2
	, t_image t3
WHERE 1=1
AND t1.category_id 	= t2.id
AND t1.id 				= t3.product_id
AND t3.type 			= 3
AND t1.id				= 1


SELECT
	* 
FROM 
	t_image
WHERE 1=1
AND product_id = 1
AND type			= 2

INSERT INTO t_product
(
	  product_name
	, product_price
	, delivery_price
	, add_delivery_price
	, tags
	, outbound_days
	, seller_id
	, category_id
)
VALUES
(
	'테스트 제품'
	, '50000'
	, '2500'
	, '5000't_product
	, '테스트'
	, 5
	, 1
	, 1
);


select t1.*, t2.path, t3.category1, t3.category2, t3.category3 
      from t_product t1, t_image t2, t_category t3
      where t1.id = t2.product_id and t2.type = 1 and t1.category_id = t3.id
