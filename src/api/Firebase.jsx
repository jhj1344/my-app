import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import {ref,get,set,getDatabase, remove} from 'firebase/database';
import {v4 as uuid} from 'uuid'; //고유 식별자를 생성해주는 패키지
import {getDownloadURL, getStorage, ref as storageRef} from 'firebase/storage';
//ref as storageRef : ref에 있는 기능을 storageRef로 옮겨주겠다는 뜻

const firebaseConfig = {
    apiKey : process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId : process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL : process.env.REACT_APP_FIREBASE_DB_URL,
    storageBucket : process.env.REACT_APP_STORAGEBUCKET

    /*
    process.env = 환경변수 nodejs 전역 객체
    환경 변수 : 실행중인 프로세스에 사용할 수 있고 애플리케이션을 구현할 수 있는
    키-값으로 이루어진 변수
    외부에서 값을 받아와서 설정할 수 있게 코드를 직접 하드코딩하지 않고 설정, 개인정보
    매개변수로 분리해서 관리하는 용도로 사용
    process = 현재 nodejs의 프로세스의 전역객체 실행중인 프로세스에 접근해서 정보를 받아옴
    .env = process에서 사용할 수 있는 모든 환경 변수를 포함하는 객체
    
    */
}

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(); // 구글 로그인 셋팅
const auth = getAuth(); //파이어베이스..?!
const database = getDatabase(app);
const storage = getStorage(app);

export {storage};

//로그인시 자동로그인 현상 수정
provider.setCustomParameters({
    prompt : 'select_account',
})

//구글 로그인
export async function login(){
    try{
        const result = await signInWithPopup (auth, provider);
        //로그인 함수를 실행시 signInWithPopup이라는 파이어베이스 인증방법을 실행
        //auth = firebase에 인증 인스턴스
        //provider = 공급자(실행하는 로그인 방법)
        const user = result.user;
        //위의 로그인이 성공적으로 실행이되면 result에는 로그인한 정보가 user라는 변수에 담기게 된다.
        console.log(user)
        return user;//로그인된 user의 정보를 다른곳에서 참조할수 있도록 반환
    }catch (error){
        console.error(error);
    }
}

//구글 로그아웃
export async function logOut(){
    try{
        await signOut(auth);//signOut은 기존의 정보들을 초기화 하는.
    }catch (error){
        console.error(error);
    }
}

//로그인시 정보를 계속 유지
export function onUserState(callback){
    onAuthStateChanged(auth, async(user)=>{
        //onAuthStateChanged = 사용자의 인증상태에 변화를 체크하는 이벤트(로그인,로그아웃)
        if(user){
            try{
                const updateUser = await adminUser(user);
                //사용자가 로그인한 경우 adminUser 라는 함수를 실행해서 사용자 권한을체크
                callback(updateUser)//업데이트된 사용자 정보를 전달받은후 callback으로 호출
            }catch (error){
                console.error(error);
            }
        }else{
            callback(null)
        }
    })
}


//관리자 계정 관리
async function adminUser(user){
    // async = 비동기식으로 데이터를 접근하는 메서드
    try{
        const snapshot = await get(ref(database, 'admin'));
        //firebase안에 database안에 admin폴더를 검색함
        if(snapshot.exists()){
            //snapshot.exists()  = snapshot안에 데이터가 있음을 의미함
            const admins = snapshot.val();//admin폴더안에 데이터목록들을 검색
            const isAdmin = admins.includes(user.email);
            //검색된 admin 에 현재 로그인된 사용자의 이메일과 일치하는 이메일이 있는지 확인(이걸로 관리자인지 아닌지를 탐색)
            console.log(isAdmin)
            return{...user, isAdmin}
            //원래 사용자 정보와 isAdmin 변수를 새 배열에 추가해서 업데이트 후 반환
        }
        return user
        //데이터베이스에 admin이라는 폴더가 없으면 user만 반환
    }catch(error){
        console.error(error);
    }
}


//파이어베이스에 상품 정보 연동하기
export async function addProducts(product,image){
    const id = uuid();
    return set(ref(database, `products/${id}`),{
        ...product,
        id,
        image,
        price : parseInt(product.price)
        //option : product.option.split(',').map(option => option.trim())
        //trim() 문자열에 있는 공백제거
        //join(',') 분리된 문자를 다시 문자열로 쉼표로 구분하여 작성

    })
}

//database에 연동된 정보들을 가져오기
export async function getProducts(){
    //async 비동기 방식의 데이터 처리방법(promise의 단점을 보완한 최신 비동기처리방식코드)
    // return get(ref(database,'products')).then((snapshot)=>{
    //     //파이어베이스에 있는 실시간 데이터베이스의 product 노드(경로)에 대한 참조와 함께
    //     //생성하고 읽기 작업을 시작하면 비동기로 호출받은 정보값을 반환
    //     //.then((snapshot) snapshot은 내가 참조하고 있는 노드
    //     //snapshot이라는 매개변수명을 사용하는 이유는
    //     //특정 순간을 저장한 후에 결과와 비교해서 일치하는지 확인하는 테스트 단계
    //     if(snapshot.exists()){
    //         //snapshot.exists() = snapshot에 접근한 노드에 데이터가 있는지 확인
    //         return Object.values(snapshot.val())
    //         //snapshot노드에 있는 객체들을 오브젝트로 변환해서 반환
    //     }
    //     return[]
    //     //snapshot.exists() = false
    // })

    const snapshot = await get(ref(database,'products'));
    if(snapshot.exists()){
        return Object.values(snapshot.val())
    }else{
        return []
    }
}

//장바구니에 저장된 요소들을 업데이트 하기
export async function updateCart(userId, product){
    try{
        const cartRef = ref(database, `cart/${userId}/${product.id}`);
        await set(cartRef, product);

    }catch(error){
        console.error(error);
    }
}
//데이터 베이스에 있는 장바구니 리스트 불러오기
export async function getCart(userId){
    try{
        const snapshot = await(get(ref(database,`cart/${userId}`)));
        if(snapshot.exists()){
            const item = snapshot.val();
            return Object.values(item)
        }else{
            return[];
        }
    }catch(error){
        console.error(error)
    }
}

//장바구니 상품 삭제하기
export async function deleteCartItem(userId, productId){
    console.log(userId, productId);
    return remove(ref(database, `cart/${userId}/${productId}`));
}


//데이터베이스에 등록한 상품 카테고리 불러오기
export async function getCategory(){
    const database = getDatabase()
    const categoryRef = ref(database , 'products');
    try{
        const snapshot = await get(categoryRef);
        if(snapshot.exists()){
            return Object.values(snapshot.val());
        }
        return []
    }catch(error){
        console.error(error)
    }
}

//데이터베이스에 있는 카테고리별 상품을 분류해서 불러오기
export async function getCategoryProduct(category){
    return get(ref(database, 'products'))
    .then((snapshot)=>{
        if(snapshot.exists()){
            const allProduct = Object.values(snapshot.val())
            //먼저 모든 상품 정보를 받아온후에 카테고리별로 필터링을 거치는 순서
            const filterProduct = allProduct.filter((product)=>product.category === category)
            return filterProduct
        }
        return []
    })
}

//상품검색
export async function searchProduct(query){
    try{
        const dbRef = ref(database, 'products');
        const snapshot = await get(dbRef);

        if(snapshot.exists()){
            const data = snapshot.val();
            const allProduct = Object.values(data);

            if(allProduct.length === 0){
                return []
            }
            const matchItems = allProduct.filter((product)=>{
                const itemTitle = product.title.toLowerCase()//toLowerCase():받아온 문자열에 영어면 소문자로 변환
                console.log(itemTitle)
                return itemTitle.includes(query.toLowerCase())
            })
            return matchItems
        }else{
            return []
        }
    }catch(error){
        console.error(error)
    }
}

//스토리지에 있는 이미지 가져오기
export async function getStorageImg(imgPath){
    const storage = getStorage();

    try{
        const imgRef = storageRef(storage, imgPath);
        const downloadURL = await getDownloadURL(imgRef);
        return downloadURL
    }catch(error){
        console.error(error)
    }
}

//이메일 회원가입 저장하기
export async function joinEmail(email,password){
    const auth  = getAuth()//저장할 사용자 인증폼을 불러옴
    try{
        const userCredit = await createUserWithEmailAndPassword(auth, email, password)
        //createUserWithEmailAndPassword 메서드를 이용해서 사용자정보,이메일,패스워드를 변수에 담음
        const user = userCredit.user;
        console.log(user);
        return user
    }catch(error){
        console.error(error)
    }
}

export async function loginEmail(email, password){
    try{
        const userCredit = await signInWithEmailAndPassword(auth, email, password);
        return userCredit.user;
    }catch(error){
        console.error(error)
    }
}

//중복 이메일 체크
