import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

enum Tags {
    marketing = 'Marketing',
    bestPractices = 'Best Practices'
}

interface DataPost {
    id: number;
    src: string;
    heading: string;
    tag: string;
}

const data: DataPost[] = [
    {
        id: 1,
        src: '/images/post_1.webp',
        heading: 'Top 10 Reasons to Update Your Website',
        tag: Tags.marketing
    },
    {
        id: 2,
        src: '/images/post_2.webp',
        heading: 'eCommerce Website Design: 14 Best Practices',
        tag: Tags.bestPractices
    },
    {
        id: 3,
        src: '/images/post_3.webp',
        heading: 'How Much Does It Cost to Build a Hotel Booking Website?',
        tag: Tags.marketing
    },
]

export default function Home() {
    const [inputNames, setInputNames] = useState<string[]>([]);
    const [newData, setNewData] = useState<DataPost[]>(data);

    const handleInput = (e: any) => {
        const checkboxName = e.target.name;

        if (e.target.checked) {
            setInputNames((prevValue) => [...prevValue, checkboxName]);
        } else {
            setInputNames((prevValue) => prevValue.filter((name) => name !== checkboxName));
        }
    }

    useEffect(() => {
        if (inputNames.length === 0) {
            setNewData(data);
        } else {
            dataFilter(inputNames);
        }
    },  [inputNames]);

    const dataFilter = (input: string[]) => {
        const dataInfo = data.filter( (i) => input.includes(i.tag));
        setNewData(dataInfo);
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>Interview in Attract Group</title>
        <meta name="description" content="Interview in Attract Group" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <header>
              <h3 className={styles.title}> Interview in
                  <a href="https://attractgroup.com">
                      <img src={'/logo.svg'} alt={'Attract Group'}/>
                  </a>
              </h3>
          </header>

          <div className={styles.content}>
              <div className={styles.filter}>
                  {Object.values(Tags).map(tag => (
                    <label key={tag}>
                        <input onChange={handleInput} type={'checkbox'} name={tag}/>
                        {tag}
                    </label>
                  ))}
              </div>
              <div className={styles.list}>
                  {newData.map((item) => {
                      return (
                        <a key={item.id}>
                            <img src={item.src} alt='image' />
                            <h2>{item.heading}</h2>
                            <span>{item.tag}</span>
                        </a>
                      )
                  })}
              </div>
          </div>

          <footer className={styles.footer}>
              © 2011 - 2022 Attract Group - Web and Mobile Development Company. All Rights Reserved
          </footer>
      </main>
    </div>
  )
}
