import Link from "next/link";


export default function Custom500() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>500 - Internal Server error</h1>
      <p className={styles.msg}>The page you are looking for does not exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
}
