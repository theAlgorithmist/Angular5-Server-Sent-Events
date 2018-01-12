/** 
 * Copyright 2016 Jim Armstrong (www.algorithmist.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
   
/**
 * Typescript Math Toolkit - A 'game quality' implementation of a Park Miller LCG with seeding.  Use of seeding allows a repeatable sequence to be
 * generated for debugging purposes.  The complete algorithm is detailed at http://www.firstpr.com.au/dsp/rand31/
 * 

 * @author Jim Armstrong
 * 
 * @version 1.0
 */
 export class SeededRng
 {
   private _seed: number = 1;  // seed used for this RNG

  /**
   * Construt a new SeededRng
   *
   * @param seed: Number - Initial (integer) seed value, which should be in the interval [1, 0X7FFFFFFE]
   * 
   */
   constructor(seed: number)
	 {
     if (isNaN(seed) || !isFinite(seed))
       seed = 1;
      
     seed = Math.max( 1, seed  );
      
	   this._seed = seed;
	 }
    
  /**
   * returns the next pseudo-random iterate
   * 
   * @return number Next iterate in sequence as an unsigned integer
   *
   */	
   public next(): number
	 {
	   return this.__generator();
   }
		
  /**
	 * Return the next pseudo-random iterate in [0,1)
	 * 
	 * @return Number - next number in sequence in the interval [0,1)
	 */
	 public asNumber(): number
   {
	   return this.__generator() / 2147483647;
   }
		
	 // internal method - generator function, new = (16807*old * 16807) mod (2^31 - 1)
	 private __generator(): number
   {
	   // update seed
     this._seed = (16807*this._seed) % 2147483647;

     return this._seed;
   }
 }