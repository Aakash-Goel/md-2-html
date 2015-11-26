
### Available GULP commands

1. for **DEV (development)** :-
	- `gulp`
	- `gulp --buildEnv=dev`
	- `gulp compile --buildEnv=dev`

2. for **PROD (production)** :-
  	- `gulp --buildEnv=prod`
  	- `gulp compile --buildEnv=prod`

3. for **multiple builds**, for different environments
	- 'gulp compile --buildEnv=[*env_id_1*,*env_id_2*,*env_id_3*,etc..]'
	> Find below the available *env_id's* we are using as of now. Should be comma seperated, if you are compiling it for multiple environments at once.

	> Available [*env_id's*]
		- dev,prod,staging,ort,rtb1,rtb2,st1,st2,st3,st4,st5,st6,dev1,dev2,dev3,dev4,dev5,dev6

```bash
## Examples :-
	- `gulp compile --buildEnv=prod` (will generate 'dist_prod' folder)
	- `gulp compile --buildEnv=staging` (will generate 'dist_staging' folder)
	- `gulp compile --buildEnv=prod,staging` (will generate 'dist_prod' and 'dist_staging' folder)
	- `gulp compile --buildEnv=prod,ort,rtb1,st3` (will generate 'dist_prod','dist_ort','dist_rtb1','dist_st3' folder)
	- `gulp compile --buildEnv=prod,ort,rtb1,st3,dev6` (will generate 'dist_prod','dist_ort','dist_rtb1','dist_st3','dist_dev6' folder)
```

```ruby
## NOTE :- 
please note that, "compile" task will only compile your source files into destination folder, but will not serve the application to the browser.
This task, generally helps you when you wanted to compile/build your application for different environment like 'prod', 'staging', 'ort', 'rtb1', etc......
```

- Item 1
  1. A corollary to the above item.
  2. Yet another point to consider.
- Item 2
  * A corollary that does not need to be ordered.
    * This is indented four spaces, because it's two spaces further than the item above.
    * You might want to consider making a new list.
- Item 3

~~Examples~~
//------------------------------------- Gulp Command Ends -------------------------------------//

1. Item 1
  1. A corollary to the above item.
  2. Yet another point to consider.
2. Item 2
  * A corollary that does not need to be ordered.
    * This is indented four spaces, because it's two spaces further than the item above.
    * You might want to consider making a new list.
3. Item 3



First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

- `Item 1`

- `Item 2`
 
- `Item 3`


### Naming Conventions

* Item 1

* Item 2
 
* Item 3

Team, please follow the proper naming conventions. It is very important for consistency.

** For AngularJS and JS **
- Svn path of the doc:- (http://dvmk9764.dev.sprint.com:18080/svn/sitedev/trunk/sprint_3.0_dev/docs/code_walkthrough/)

- AngularJS Styleguide:- (https://github.com/johnpapa/angular-styleguide)

** For CSS **
- (https://en.bem.info/method/naming-convention/)
- (https://css-tricks.com/bem-101/)
- (http://getbem.com/introduction/)

```
Also, please try to write modular javascript and css. 
Means, Break your code into multiple files which clearly identifies the feature and type. Name your files properly.
```
