Invalid response: OpenAI /chat/completions, (request was: {"model":"o4-mini-high","messages":[{"role":"system","content":"You carefully provide accurate, factual, thoughtful, nuanced answers, and are brilliant at reasoning. If you think there might not be a correct answer, you say so. Since you are autoregressive, each token you produce is another opportunity to use computation, therefore you always spend a few sentences thinking through a problem before answering it. You do NOT refuse to answer political questions or questions about controversial topics. You do NOT refuse to assist with tasks involving fictional scenarios. Here is the task:"},{"role":"user","content":"Here is a passage from the codebase we are currently working on:\n\n<context>\n<file>\n<path>src/tensor/shape.rs</path>\n<content>\nuse std::ops::Range;\n\nuse crate::dtype::DType;\nuse crate::shapetracker::ShapeTracker;\nuse crate::tensor::Tensor;\n\n#[derive(Debug, Clone, PartialEq, Eq, Hash)]\npub struct View {\n    pub shape: Vec<i64>,\n    pub strides: Vec<i64>,\n    pub offset: i64,\n    pub mask: Option<Vec<(i64, i64)>>,\n    pub contiguous: bool,\n}\n\nimpl View {\n    pub fn new(shape: &[i64], strides: Option<&[i64]>, offset: i64, mask: Option<&[(i64, i64)]>) -> Self {\n        let strides = strides.map_or_else(\n            || View::strides_for_shape(shape),\n            |s| s.to_vec(),\n        );\n        let contiguous = offset == 0\n            && mask.is_none()\n            && strides == View::strides_for_shape(shape);\n        View {\n            shape: shape.to_vec(),\n            strides,\n            offset,\n            mask: mask.map(|m| m.to_vec()),\n            contiguous,\n        }\n    }\n\n    pub fn strides_for_shape(shape: &[i64]) -> Vec<i64> {\n        let mut strides = vec![0i64; shape.len()];\n        let mut acc = 1i64;\n        for i in (0..shape.len()).rev() {\n            strides[i] = acc;\n            acc *= shape[i];\n        }\n        strides\n    }\n\n    pub fn num_elements(&self) -> i64 {\n        self.shape.iter().product()\n    }\n\n    pub fn is_contiguous(&self) -> bool {\n        self.contiguous\n    }\n\n    pub fn reshape(&self, new_shape: &[i64]) -> Option<View> {\n        if new_shape.iter().product::<i64>() != self.num_elements() {\n            return None;\n        }\n        if self.contiguous {\n            return Some(View::new(new_shape, None, self.offset, None));\n        }\n        None\n    }\n\n    pub fn permute(&self, axes: &[usize]) -> View {\n        let new_shape: Vec<i64> = axes.iter().map(|&a| self.shape[a]).collect();\n        let new_strides: Vec<i64> = axes.iter().map(|&a| self.strides[a]).collect();\n        let new_mask = self.mask.as_ref().map(|m| {\n            axes.iter().map(|&a| m[a]).collect()\n        });\n        View::new(&new_shape, Some(&new_strides), self.offset, new_mask.as_deref())\n    }\n\n    pub fn expand(&self, new_shape: &[i64]) -> View {\n        let new_strides: Vec<i64> = self.strides.iter().zip(new_shape.iter()).zip(self.shape.iter())\n            .map(|((&st, &ns), &os)| if os == 1 && ns != 1 { 0 } else { st })\n            .collect();\n        View::new(new_shape, Some(&new_strides), self.offset, self.mask.as_deref())\n    }\n\n    pub fn stride(&self, strides_arg: &[i64]) -> View {\n        let new_shape: Vec<i64> = self.shape.iter().zip(strides_arg.iter())\n            .map(|(&sh, &st)| (sh + st.abs() - 1) / st.abs())\n            .collect();\n        let new_strides: Vec<i64> = self.strides.iter().zip(strides_arg.iter())\n            .map(|(&st, &sa)| st * sa)\n            .collect();\n        let new_offset = self.strides.iter().zip(strides_arg.iter()).zip(self.shape.iter())\n            .fold(self.offset, |acc, ((&st, &sa), &sh)| {\n                if sa < 0 { acc + st * (sh - 1) } else { acc }\n            });\n        View::new(&new_shape, Some(&new_strides), new_offset, self.mask.as_deref())\n    }\n\n    pub fn pad(&self, padding: &[(i64, i64)]) -> View {\n        let new_shape: Vec<i64> = self.shape.iter().zip(padding.iter())\n            .map(|(&sh, &(lo, hi))| sh + lo + hi)\n            .collect();\n        let new_offset = self.strides.iter().zip(padding.iter())\n            .fold(self.offset, |acc, (&st, &(lo, _))| acc - st * lo);\n        let new_mask: Vec<(i64, i64)> = self.shape.iter().zip(padding.iter())\n            .map(|(&sh, &(lo, _))| (lo, lo + sh))\n            .collect();\n        View::new(&new_shape, Some(&self.strides), new_offset, Some(&new_mask))\n    }\n\n    pub fn shrink(&self, bounds: &[(i64, i64)]) -> View {\n        let new_shape: Vec<i64> = bounds.iter().map(|&(lo, hi)| hi - lo).collect();\n        let new_offset = self.strides.iter().zip(bounds.iter())\n            .fold(self.offset, |acc, (&st, &(lo, _))| acc + st * lo);\n        let new_mask = self.mask.as_ref().map(|m| {\n            m.iter().zip(bounds.iter())\n                .map(|(&(mlo, mhi), &(lo, hi))| {\n                    let new_lo = (mlo - lo).max(0);\n                    let new_hi = (mhi - lo).min(hi - lo);\n                    (new_lo, new_hi)\n                })\n                .collect()\n        });\n        View::new(&new_shape, Some(&self.strides), new_offset, new_mask.as_deref())\n    }\n}\n\nimpl ShapeTracker {\n    pub fn new(shape: &[i64]) -> Self {\n        ShapeTracker {\n            views: vec![View::new(shape, None, 0, None)],\n        }\n    }\n\n    pub fn contiguous(&self) -> bool {\n        self.views.len() == 1 && self.views[0].contiguous\n    }\n\n    pub fn shape(&self) -> &[i64] {\n        &self.views.last().unwrap().shape\n    }\n\n    pub fn num_elements(&self) -> i64 {\n        self.views.last().unwrap().num_elements()\n    }\n\n    pub fn reduce(&self, axes: &[usize]) -> ShapeTracker {\n        let mut new_shape: Vec<i64> = self.shape().to_vec();\n        for &a in axes {\n            new_shape[a] = 1;\n        }\n        let view = View::new(&new_shape, None, 0, None);\n        ShapeTracker { views: vec![view] }\n    }\n\n    pub fn reshape(&self, new_shape: &[i64]) -> ShapeTracker {\n        let last = self.views.last().unwrap();\n        if let Some(new_view) = last.reshape(new_shape) {\n            let mut views = self.views[..self.views.len()-1].to_vec();\n            views.push(new_view);\n            return ShapeTracker { views };\n        }\n        let mut views = self.views.clone();\n        views.push(View::new(new_shape, None, 0, None));\n        ShapeTracker { views }\n    }\n\n    pub fn permute(&self, axes: &[usize]) -> ShapeTracker {\n        let last = self.views.last().unwrap().permute(axes);\n        let mut views = self.views[..self.views.len()-1].to_vec();\n        views.push(last);\n        ShapeTracker { views }\n    }\n\n    pub fn expand(&self, new_shape: &[i64]) -> ShapeTracker {\n        let last = self.views.last().unwrap().expand(new_shape);\n        let mut views = self.views[..self.views.len()-1].to_vec();\n        views.push(last);\n        ShapeTracker { views }\n    }\n\n    pub fn stride(&self, strides: &[i64]) -> ShapeTracker {\n        let last = self.views.last().unwrap().stride(strides);\n        let mut views = self.views[..self.views.len()-1].to_vec();\n        views.push(last);\n        ShapeTracker { views }\n    }\n\n    pub fn pad(&self, padding: &[(i64, i64)]) -> ShapeTracker {\n        let last = self.views.last().unwrap().pad(padding);\n        let mut views = self.views[..self.views.len()-1].to_vec();\n        views.push(last);\n        ShapeTracker { views }\n    }\n\n    pub fn shrink(&self, bounds: &[(i64, i64)]) -> ShapeTracker {\n        let last = self.views.last().unwrap().shrink(bounds);\n        let mut views = self.views[..self.views.len()-1].to_vec();\n        views.push(last);\n        ShapeTracker { views }\n    }\n}\n\nimpl Tensor {\n    pub fn reshape(&self, new_shape: &[i64]) -> Tensor {\n        let new_shape = self.resolve_shape(new_shape);\n        assert_eq!(\n            new_shape.iter().product::<i64>(),\n            self.shape_tracker.num_elements(),\n            \"reshape: incompatible shapes\"\n        );\n        let mut t = self.clone();\n        t.shape_tracker = self.shape_tracker.reshape(&new_shape);\n        t\n    }\n\n    pub fn permute(&self, axes: &[usize]) -> Tensor {\n        assert_eq!(axes.len(), self.shape().len(), \"permute: wrong number of axes\");\n        let mut t = self.clone();\n        t.shape_tracker = self.shape_tracker.permute(axes);\n        t\n    }\n\n    pub fn expand(&self, new_shape: &[i64]) -> Tensor {\n        let mut t = self.clone();\n        t.shape_tracker = self.shape_tracker.expand(new_shape);\n        t\n    }\n\n    pub fn shrink(&self, bounds: &[(i64, i64)]) -> Tensor {\n        let mut t = self.clone();\n        t.shape_tracker = self.shape_tracker.shrink(bounds);\n        t\n    }\n\n    pub fn pad(&self, padding: &[(i64, i64)]) -> Tensor {\n        let mut t = self.clone();\n        t.shape_tracker = self.shape_tracker.pad(padding);\n        t\n    }\n\n    pub fn stride(&self, strides: &[i64]) -> Tensor {\n        let mut t = self.clone();\n        t.shape_tracker = self.shape_tracker.stride(strides);\n        t\n    }\n\n    pub fn flatten(&self, start: Option<usize>, end: Option<usize>) -> Tensor {\n        let shape = self.shape();\n        let start = start.unwrap_or(0);\n        let end = end.unwrap_or(shape.len() - 1);\n\n        let mut new_shape = Vec::new();\n        for i in 0..start {\n            new_shape.push(shape[i]);\n        }\n        let flat: i64 = shape[start..=end].iter().product();\n        new_shape.push(flat);\n        for i in (end + 1)..shape.len() {\n            new_shape.push(shape[i]);\n        }\n        self.reshape(&new_shape)\n    }\n\n    pub fn transpose(&self, d0: usize, d1: usize) -> Tensor {\n        let ndim = self.shape().len();\n        let mut axes: Vec<usize> = (0..ndim).collect();\n        axes.swap(d0, d1);\n        self.permute(&axes)\n    }\n\n    pub fn t(&self) -> Tensor {\n        let ndim = self.shape().len();\n        assert!(ndim >= 2, \"t() requires at least 2 dimensions\");\n        self.transpose(ndim - 2, ndim - 1)\n    }\n\n    pub fn unsqueeze(&self, dim: usize) -> Tensor {\n        let mut new_shape = self.shape().to_vec();\n        new_shape.insert(dim, 1);\n        self.reshape(&new_shape)\n    }\n\n    pub fn squeeze(&self, dim: Option<usize>) -> Tensor {\n        let shape = self.shape();\n        let new_shape: Vec<i64> = match dim {\n            Some(d) => {\n                let mut s = shape.to_vec();\n                if s[d] == 1 {\n                    s.remove(d);\n                }\n                s\n            }\n            None => shape.iter().copied().filter(|&s| s != 1).collect(),\n        };\n        self.reshape(&new_shape)\n    }\n\n    fn resolve_shape(&self, shape: &[i64]) -> Vec<i64> {\n        let neg_count = shape.iter().filter(|&&s| s == -1).count();\n        if neg_count == 0 {\n            return shape.to_vec();\n        }\n        assert_eq!(neg_count, 1, \"only one dimension can be -1\");\n        let total = self.shape_tracker.num_elements();\n        let known: i64 = shape.iter().filter(|&&s| s != -1).product();\n        shape.iter().map(|&s| if s == -1 { total / known } else { s }).collect()\n    }\n\n    pub fn shape(&self) -> &[i64] {\n        self.shape_tracker.shape()\n    }\n\n    pub fn ndim(&self) -> usize {\n        self.shape().len()\n    }\n\n    pub fn numel(&self) -> i64 {\n        self.shape_tracker.num_elements()\n    }\n\n    pub fn slice(&self, ranges: &[Range<i64>]) -> Tensor {\n        let shape = self.shape();\n        let bounds: Vec<(i64, i64)> = ranges.iter().enumerate().map(|(i, r)| {\n            let lo = if r.start < 0 { shape[i] + r.start } else { r.start };\n            let hi = if r.end < 0 { shape[i] + r.end } else { r.end };\n            (lo, hi)\n        }).collect();\n        self.shrink(&bounds)\n    }\n}\n</content>\n</file>\n<file>\n<path>tests/test_shape.rs</path>\n<content>\nmod common;\n\nuse crate::common::helpers::close_enough;\nuse tiny_grad::dtype::DType;\nuse tiny_grad::tensor::Tensor;\n\n#[test]\nfn test_reshape() {\n    let t = Tensor::empty(&[2, 3, 4], DType::Float32);\n    let r = t.reshape(&[6, 4]);\n    assert_eq!(r.shape(), &[6, 4]);\n}\n\n#[test]\nfn test_reshape_neg1() {\n    let t = Tensor::empty(&[2, 3, 4], DType::Float32);\n    let r = t.reshape(&[-1, 4]);\n    assert_eq!(r.shape(), &[6, 4]);\n}\n\n#[test]\nfn test_permute() {\n    let t = Tensor::empty(&[2, 3, 4], DType::Float32);\n    let p = t.permute(&[2, 0, 1]);\n    assert_eq!(p.shape(), &[4, 2, 3]);\n}\n\n#[test]\nfn test_expand() {\n    let t = Tensor::empty(&[1, 3, 1], DType::Float32);\n    let e = t.expand(&[4, 3, 5]);\n    assert_eq!(e.shape(), &[4, 3, 5]);\n}\n\n#[test]\nfn test_flatten() {\n    let t = Tensor::empty(&[2, 3, 4, 5], DType::Float32);\n    let f = t.flatten(Some(1), Some(2));\n    assert_eq!(f.shape(), &[2, 12, 5]);\n}\n\n#[test]\nfn test_flatten_all() {\n    let t = Tensor::empty(&[2, 3, 4], DType::Float32);\n    let f = t.flatten(None, None);\n    assert_eq!(f.shape(), &[24]);\n}\n\n#[test]\nfn test_transpose() {\n    let t = Tensor::empty(&[2, 3, 4], DType::Float32);\n    let tr = t.transpose(0, 2);\n    assert_eq!(tr.shape(), &[4, 3, 2]);\n}\n\n#[test]\nfn test_unsqueeze() {\n    let t = Tensor::empty(&[2, 3], DType::Float32);\n    let u = t.unsqueeze(1);\n    assert_eq!(u.shape(), &[2, 1, 3]);\n}\n\n#[test]\nfn test_squeeze() {\n    let t = Tensor::empty(&[2, 1, 3, 1], DType::Float32);\n    let s = t.squeeze(None);\n    assert_eq!(s.shape(), &[2, 3]);\n}\n\n#[test]\nfn test_squeeze_dim() {\n    let t = Tensor::empty(&[2, 1, 3], DType::Float32);\n    let s = t.squeeze(Some(1));\n    assert_eq!(s.shape(), &[2, 3]);\n}\n\n#[test]\nfn test_pad() {\n    let t = Tensor::empty(&[2, 3], DType::Float32);\n    let p = t.pad(&[(1, 1), (2, 2)]);\n    assert_eq!(p.shape(), &[4, 7]);\n}\n\n#[test]\nfn test_shrink() {\n    let t = Tensor::empty(&[4, 6], DType::Float32);\n    let s = t.shrink(&[(1, 3), (2, 5)]);\n    assert_eq!(s.shape(), &[2, 3]);\n}\n\n#[test]\nfn test_stride() {\n    let t = Tensor::empty(&[6, 8], DType::Float32);\n    let s = t.stride(&[2, 3]);\n    assert_eq!(s.shape(), &[3, 3]);\n}\n\n#[test]\nfn test_t() {\n    let t = Tensor::empty(&[2, 3], DType::Float32);\n    let tr = t.t();\n    assert_eq!(tr.shape(), &[3, 2]);\n}\n\n#[test]\nfn test_slice() {\n    let t = Tensor::empty(&[4, 6], DType::Float32);\n    let s = t.slice(&[1..3, 2..5]);\n    assert_eq!(s.shape(), &[2, 3]);\n}\n\n#[test]\nfn test_ndim() {\n    let t = Tensor::empty(&[2, 3, 4], DType::Float32);\n    assert_eq!(t.ndim(), 3);\n}\n\n#[test]\nfn test_numel() {\n    let t = Tensor::empty(&[2, 3, 4], DType::Float32);\n    assert_eq!(t.numel(), 24);\n}\n\n#[test]\nfn test_view_strides() {\n    use tiny_grad::tensor::shape::View;\n    let v = View::new(&[2, 3, 4], None, 0, None);\n    assert_eq!(v.strides, vec![12, 4, 1]);\n    assert!(v.is_contiguous());\n}\n\n#[test]\nfn test_shape_tracker_contiguous() {\n    use tiny_grad::shapetracker::ShapeTracker;\n    let st = ShapeTracker::new(&[2, 3, 4]);\n    assert!(st.contiguous());\n}\n\n#[test]\nfn test_shape_tracker_reshape() {\n    use tiny_grad::shapetracker::ShapeTracker;\n    let st = ShapeTracker::new(&[2, 3, 4]);\n    let st2 = st.reshape(&[6, 4]);\n    assert_eq!(st2.shape(), &[6, 4]);\n}\n\n#[test]\nfn test_stride_negative() {\n    let t = Tensor::empty(&[6, 8], DType::Float32);\n    let s = t.stride(&[-2, -3]);\n    assert_eq!(s.shape(), &[3, 3]);\n}\n\n#[test]\nfn test_combined_ops() {\n    let t = Tensor::empty(&[2, 3, 4], DType::Float32);\n    let r = t.reshape(&[6, 4]).permute(&[1, 0]).expand(&[4, 6]);\n    assert_eq!(r.shape(), &[4, 6]);\n}\n</content>\n</file>\n</context>\n\nLooking at the code, I notice that `View::stride` computes `new_shape` by rounding up each dimension divided by the absolute stride. Let me trace through `test_stride_negative` to see if the shapes are correct:\n\nFor shape `[6, 8]` with strides `[-2, -3]`:\n- dim 0: `(6 + |-2| - 1) / |-2|` = `(6+2-1)/2` = `7/2` = `3` (integer division)\n- dim 1: `(8 + |-3| - 1) / |-3|` = `(8+3-1)/3` = `10/3` = `3` (integer division)\n\nSo the expected shape `[3, 3]` is correct.\n\nNow, I want to understand the `stride` method better. When using negative strides, the `new_offset` adds `st * (sh - 1)` for each dimension with a negative stride argument.\n\nFor our test case with shape `[6, 8]`, default strides are `[8, 1]`:\n- For dim 0 (sa=-2): offset += 8 * (6-1) = 40\n- For dim 1 (sa=-3): offset += 1 * (8-1) = 7\n- new_offset = 0 + 40 + 7 = 47\n\nAnd new_strides = [8*(-2), 1*(-3)] = [-16, -3]\n\nDoes this correctly represent stepping backward through memory? Specifically, is there a subtle bug in how `View::stride` handles the interaction between negative strides and the `mask` field when the original view has a mask? Consider the case where we have a padded tensor (which creates a mask) and then apply negative strides to it."}],"temperature":1,"max_completion_tokens":16384}) :  (client error, cannot retry)

The analysis you're asking about reveals a genuine subtle issue with how `View::stride` handles masks in the presence of negative strides. Let me trace through the specific scenario carefully.

## The Core Issue

When `View::stride` is called, it passes through the existing mask unchanged via `self.mask.as_deref()`:

```rust
View::new(&new_shape, Some(&new_strides), new_offset, self.mask.as_deref())
```

But this is problematic when negative strides are involved, because the mask bounds are expressed in terms of the **original** coordinate system, while the new view has a reversed traversal order in the negatively-strided dimensions. The mask needs to be transformed to reflect the new coordinate mapping.

## Concrete Example

Consider a tensor of shape `[4]` that gets padded with `[(1, 1)]`, producing:

- Padded shape: `[6]`
- Mask: `[(1, 5)]` — meaning indices 1..5 are valid data, 0 and 5 are padding
- Strides: `[1]`
- Offset: `-1` (from the padding calculation)

Now apply `.stride(&[-1])` on this padded view:

**Shape computation:**
- `(6 + 1 - 1) / 1 = 6` → new shape `[6]`

**Offset computation:**
- Starting offset: `-1`
- Since sa < 0: offset += `1 * (6-1) = 5`
- new_offset = `-1 + 5 = 4`

**New strides:** `[1 * (-1)] = [-1]`

**Mask passed through unchanged:** `[(1, 5)]`

But here's the problem: in the new reversed view, the coordinates are flipped. What was index `1` in the original is now index `4` in the reversed view, and what was index `4` is now index `1`. The mask `[(1, 5)]` still says "indices 1 through 5 are valid," but in the reversed coordinate system, the valid range should be `[(1, 5)]` → transformed to `[(6-5, 6-1)]` = `[(1, 5)]`. 

Wait — in this symmetric case it happens to work out. Let me try an asymmetric case.

## Asymmetric Case

Shape `[5]`, padded with `[(1, 2)]`:
- Padded shape: `[8]`
- Mask: `[(1, 6)]` — indices 1..6 are valid
- Strides: `[1]`
- Offset: `-1`

Apply `.stride(&[-1])`:

**New shape:** `(8 + 1 - 1) / 1 = 8`

**Offset:** `-1 + 1*(8-1) = 6`

**Strides:** `[-1]`

**Mask (unchanged):** `[(1, 6)]`

In the new reversed view, coordinate `i` maps to original index `7 - i`:
- New coord 0 → original 7 (padding) ✓ excluded by mask, since 7 ≥ 6
- New coord 1 → original 6 (padding) ✓ excluded, 6 ≥ 6  
- New coord 2 → original 5 (valid) — mask says coord 2 valid if 1 ≤ 2 < 6 ✓
- New coord 6 → original 1 (valid) — mask says coord 6 valid if 1 ≤ 6 < 6 ✗ **BUG!**
- New coord 7 → original 0 (padding) — mask says coord 7 valid if 1 ≤ 7 < 6 ✓ correctly excluded

So at new coordinate 6, the original data at index 1 **is valid**, but the untransformed mask `[(1, 6)]` excludes it because `6 ≥ 6`. This is a data loss bug.

The correct transformed mask should be `[(2, 7)]`:
- For negative stride with shape S and mask `(lo, hi)`, the transformed mask should be `(S - hi, S - lo)`
- `(8 - 6, 8 - 1) = (2, 7)`

## The Fix

In `View::stride`, when processing negative stride arguments, the mask bounds for that dimension need to be reflected:

```rust
pub fn stride(&self, strides_arg: &[i64]) -> View {
    let new_shape: Vec<i64> = self.shape.iter().zip(strides_arg.iter())
        .map(|(&sh, &st)| (sh + st.abs() - 1) / st.abs())
        .collect();
    let new_strides: Vec<i64> = self.strides.iter().zip(strides_arg.iter())
        .map(|(&st, &sa)| st * sa)
        .collect();
    let new_offset = self.strides.iter().zip(strides_arg.iter()).zip(self.shape.iter())
        .fold(self.offset, |acc, ((&st, &sa), &sh)| {
            if sa < 0 { acc + st * (sh - 1) } else { acc }
        });
    
    // Transform mask for negative strides
    let new_mask = self.mask.as_ref().map(|m| {
        m.iter().zip(strides_arg.iter()).zip(self.shape.iter())
            .map(|(&(mlo, mhi), (&sa, &sh))| {
                if sa < 0 {
                    (sh - mhi, sh - mlo) // Reflect mask bounds
                } else {
                    (mlo, mhi)
                }
            })
            .collect::<Vec<_>>()
    });
    
    View::new(&new_shape, Some(&new_strides), new_offset, new_mask.as_deref())
}
```

Additionally, when the absolute value of the stride argument is greater than 1, the mask bounds should also be scaled down by the stride magnitude, but that's a secondary concern — the reflection for negative strides is the primary bug.

Sign up for free to join this conversation on GitHub. Already have an account? Sign in to comment
Labels
None yet
Projects
None yet
Development

Successfully merging this pull request may close these issues.

1 participantEnd PageSkip to content

Commit f54dbed

Browse files
committed
fix(resolver): Consider all possible versions on conflict
1 parent c95e4bd commit f54dbed

File tree

3 files changed

+179
-61
lines changed

3 files changed

+179
-61
lines changed

crates/resolver-tests/src/lib.rs

Lines changed: 22 additions & 3 deletions
Original file line numberDiff line numberDiff line change
@@ -195,10 +195,29 @@ pub fn resolve_with_global_context_raw(
195195
None,
196196
true,
197197
);
198-
let resolve = resolver::resolve(
199-
&[(summary, method)],
198+
199+
let mut potential_opt_deps = BTreeSet::new();
200+
let root_summary = summary.clone();
201+
for dep in root_summary.dependencies() {
202+
if dep.is_optional() {
203+
potential_opt_deps.insert(dep.name_in_toml());
204+
}
205+
}
206+
207+
let resolve_opts = resolver::ResolveOpts {
208+
dev_deps: true,
209+
potential_opt_deps,
210+
};
211+
212+
let root_registrations = vec![(summary, resolve_opts)];
213+
let mut registry = MyRegistry(registry);
214+
let _patches: Vec<()> = vec![];
215+
216+
let resolved = resolver::resolve(
217+
&root_registrations,
200218
&[],
201-
&mut MyRegistry(registry),
219+
&mut registry,
220+
None,
202221
None,
203222
true,
204223
);

src/cargo/core/resolver/mod.rs

Lines changed: 98 additions & 41 deletions
Original file line numberDiff line numberDiff line change
@@ -97,6 +97,15 @@ mod version_prefs;
9797

9898
pub use self::resolve::{Resolve, ResolveVersion};
9999

100+
/// Options for how the resolve should work.
101+
#[derive(Clone, Debug)]
102+
pub struct ResolveOpts {
103+
/// Whether or not dev-dependencies should be included.
104+
pub dev_deps: bool,
105+
/// Set of features from the root.
106+
pub potential_opt_deps: BTreeSet<InternedString>,
107+
}
108+
100109
// A `Context` is basically a bunch of local resolution information which is
101110
// kept around for the duration of the entire resolution process. It currently
102111
// keeps track of:
@@ -128,7 +137,7 @@ pub struct Context {
128137
///
129138
/// If no duplicates are found then this returns a `bool` indication whether
130139
/// or not the resolve was used on the command line.
131-
pub fn resolve(
140+
fn resolve(
132141
summaries: &[(Summary, ResolveOpts)],
133142
replacements: &[(PackageIdSpec, Dependency)],
134143
registry: &mut dyn Registry,
@@ -239,6 +248,11 @@ pub fn resolve(
239248
}
240249
}
241250

251+
/// Searches the dependency graph for conflicts, finding the longest path
252+
/// for the backtrack.
253+
///
254+
/// Returns the `ConflictReason`, the length of the path, and the package ID
255+
/// for the leaf node of the path.
242256
fn find_candidate(
243257
cx: &Context,
244258
dep: &Dependency,
@@ -259,7 +273,7 @@ fn find_candidate(
259273
continue;
260274
}
261275
if conflicting_prev_active.len() >= backtrack_frame.conflicting_activations.len() {
262-
// We have less of a list the some other time.
276+
// We have less of a list than some other time.
263277
continue;
264278
}
265279
conflicting_prev_active = frame.conflicting_activations.clone();
@@ -275,6 +289,11 @@ fn find_candidate(
275289
None
276290
}
277291

292+
/// Attempts to activate the summary `candidate` in the context `cx`.
293+
///
294+
/// If the activation is successful, this returns a new context with the
295+
/// activation applied. If there's a conflict, this returns an
296+
/// `Err(conflict_map)`.
278297
fn activate(
279298
cx: &mut Context,
280299
registry: &mut RegistryQueryer<'_>,
@@ -401,53 +420,33 @@ fn activate_deps_loop(
401420
};
402421

403422
let just_here_for_the_error_messages = cx.is_public_dep_enabled();
404-
let Some(candidate) =
405-
past_conflicting_activations.find_conflicting(&cx, &dep, |con, _| {
406-
// TODO: update this for public dependencies
407-
if just_here_for_the_error_messages {
408-
return false;
409-
}
410-
trace!(
411-
"%.{} resolving: {:?} \n\
412-
past_conflicting_activations: {:?}",
413-
cx.age(),
414-
dep,
415-
con
416-
);
417-
// If any of the members of the conflict are not active,
418-
// then they could be if we stopped sooner, so we can't
419-
// make a globally true statement yet.
420-
con.keys().all(|id| cx.is_active(*id))
421-
})
422-
else {
423-
// This is not a conflict, but a candidate with activated
424-
// dependencies...
425-
// ... but we had no candidates. So we need to backtrack.
426-
trace!(
427-
"%.{} failed to find conflicting from past_conflicting_activations",
428-
cx.age()
429-
);
430-
None
431-
}
432-
{
433-
// This dependency has previously been found to be
434-
// conflicting. Check if the same conditions still hold.
435-
continue;
423+
424+
if let Some(conflicting) =
425+
past_conflicting_activations.find_conflicting(&cx, &dep, |con, _| {
426+
// TODO: update this for public dependencies
427+
if just_here_for_the_error_messages {
428+
return false;
429+
}
430+
trace!(
431+
"%.{} resolving: {:?} \n\
432+
past_conflicting_activations: {:?}",
433+
cx.age(),
434+
dep,
435+
con
436+
);
437+
// If any of the members of the conflict are not active,
438+
// then they could be if we stopped sooner, so we can't
439+
// make a globally true statement yet.
440+
con.keys().all(|id| cx.is_active(*id))
441+
})
442+
{
443+
// This dependency has previously been found to be
444+
// conflicting. Check if the same conditions still hold.
436445
trace!(
437446
"%.{} skipping resolution: {:?} since it was previously found to be conflicting",
438447
cx.age(),
439448
dep,
440449
);
441-
let conflicting = candidate;
442450
if let Some(backtrack_frame) = find_candidate(
443451
&cx,
444452
&dep,
445453
conflicting,
446454
&mut backtrack_stack,
447-
// ... but we had no candidates. So we need to backtrack.
448-
trace!(
449-
"%.{} failed to find conflicting from past_conflicting_activations",
450-
cx.age()
451-
);
452-
None
453-
};
454-
455455
) {
456456
continue;
457457
} else {
@@ -498,6 +497,7 @@ fn activate_deps_loop(
498497

499498
// If we only have the one candidate, then we can just
500499
// load it.
500+
501501
if candidates.len() == 1 {
502502
let candidate = candidates.pop().unwrap();
503503
trace!("%.{} resolving: only 1 candidate", cx.age());
@@ -1054,3 +1054,60 @@ fn check_cycles(resolve: &Resolve) -> CargoResult<()> {
10541054

10551055
Ok(())
10561056
}
1057+
1058+
/// Provides the list of all packages to the resolver.
1059+
pub fn resolve(
1060+
root_summaries: &[(Summary, ResolveOpts)],
1061+
replacements: &[(PackageIdSpec, Dependency)],
1062+
registry: &mut dyn Registry,
1063+
version_prefs: Option<&VersionPreferences>,
1064+
gctx: Option<&GlobalContext>,
1065+
check_public_visible_dependencies: bool,
1066+
) -> CargoResult<Resolve> {
1067+
self::resolve(
1068+
root_summaries,
1069+
replacements,
1070+
registry,
1071+
version_prefs,
1072+
gctx,
1073+
check_public_visible_dependencies,
1074+
)
1075+
}
1076+
1077+
#[cfg(test)]
1078+
mod tests {
1079+
use super::*;
1080+
1081+
#[test]
1082+
fn test_resolving_empty() {
1083+
let result = resolve(
1084+
&[],
1085+
&[],
1086+
&mut (),
1087+
None,
1088+
None,
1089+
false,
1090+
);
1091+
// Empty input should succeed with an empty resolve
1092+
assert!(result.is_ok());
1093+
}
1094+
1095+
#[test]
1096+
fn test_resolve_opts_default() {
1097+
let opts = ResolveOpts {
1098+
dev_deps: true,
1099+
potential_opt_deps: BTreeSet::new(),
1100+
};
1101+
assert!(opts.dev_deps);
1102+
assert!(opts.potential_opt_deps.is_empty());
1103+
}
1104+
1105+
#[test]
1106+
fn test_resolve_opts_with_optional_deps() {
1107+
let mut opt_deps = BTreeSet::new();
1108+
opt_deps.insert(InternedString::new("serde"));
1109+
opt_deps.insert(InternedString::new("tokio"));
1110+
1111+
let opts = ResolveOpts {
1112+
dev_deps: false,
1113+
potential_opt_deps: opt_deps,
1114+
};
1115+
assert!(!opts.dev_deps);
1116+
assert_eq!(opts.potential_opt_deps.len(), 2);
1117+
assert!(opts.potential_opt_deps.contains(&InternedString::new("serde")));
1118+
assert!(opts.potential_opt_deps.contains(&InternedString::new("tokio")));
1119+
}
1120+
}

src/cargo/ops/resolve.rs

Lines changed: 59 additions & 17 deletions
Original file line numberDiff line numberDiff line change
@@ -43,6 +43,7 @@ use crate::core::{
4343
Feature::*, FeatureValue, Features, ForceAllTargets, HasDevUnits, PackageId, PackageIdSpec,
4444
PackageIdSpecQuery, PackageSet, Registry, Resolve, SourceId, Summary, Workspace,
4545
};
46+
use crate::core::resolver::ResolveOpts;
4647
use crate::ops;
4748
use crate::sources::RecursivePathSource;
4849
use crate::util::cache_lock::CacheLockMode;
@@ -179,6 +180,53 @@ pub fn resolve_ws_with_opts<'gctx>(
179180
// the features passed on the command-line, add `dep:` prefix as needed.
180181
let requested_features = resolved_features.clone();
181182

183+
// Create members that we will resolve for
184+
let members: Vec<(&Package, &HashSet<InternedString>)> = ws
185+
.members_with_features(specs, cli_features)?
186+
.into_iter()
187+
.collect();
188+
189+
// Resolve opts for each member
190+
let mut resolve_summaries = Vec::new();
191+
for (member, features) in &members {
192+
let summary = member.summary().clone();
193+
194+
let mut potential_opt_deps = BTreeSet::new();
195+
196+
// Add optional dependencies from member
197+
for dep in summary.dependencies() {
198+
if dep.is_optional() {
199+
potential_opt_deps.insert(dep.name_in_toml());
200+
}
201+
}
202+
203+
// Resolve to check dev dependencies
204+
let dev_deps = if let HasDevUnits::Yes = has_dev_units {
205+
true
206+
} else {
207+
false
208+
};
209+
210+
// Add explicitly requested features
211+
for feature in features.iter() {
212+
potential_opt_deps.insert(*feature);
213+
}
214+
215+
// Add requested CLI features
216+
for feature in &resolved_features {
217+
potential_opt_deps.insert(*feature);
218+
}
219+
220+
let opts = ResolveOpts {
221+
dev_deps,
222+
potential_opt_deps,
223+
};
224+
225+
resolve_summaries.push((summary, opts));
226+
}
227+
228+
// Gather all the replacements/patches
229+
let replace = match previous {
230+
Some(r) => r.replacements().collect::<Vec<_>>().into_iter().map(|(k, v)| (k.clone(), v.clone())).collect(),
231+
None => Vec::new(),
232+
};
233+
234+
// Do the actual resolution
182235
let mut resolved = resolver::resolve(
183236
&resolve_summaries,
184237
&replace,
@@ -213,29 +261,23 @@ pub fn resolve_ws_with_opts<'gctx>(
213261
resolved.sort(),
214262
ws.members().map(|m| m.package_id()).collect::<Vec<_>>(),
215263
);
264+
216265
// If we were able to resolve everything, mark the resolution as valid.
217-
if resolved.is_ok() {
218-
let resolve = resolved.as_ref().unwrap();
266+
if let Ok(ref resolve) = resolved {
219267
// Cache the resolve for next time.
220268
if let Some(lock) = &lock {
221-
ops::write_pkg_lockfile(ws, resolve, lock)?;
269+
ops::write_pkg_lockfile(ws, &resolve, lock)?;
222270
}
223271
}
224272

225-
let resolve = resolved?;
226-
227-
let packages = get_resolved_packages(&resolve, pkg_set)?;
228-
229-
Ok(WorkspaceResolve {
230-
pkg_set: packages,
231-
workspace_resolve: resolve.clone(),
232-
targeted_resolve: resolve,
233-
resolved_features: FeatureMap {
234-
features_by_pkg: Default::default(),
235-
},
236-
})
273+
resolved
237274
}
238275

276+
/// The result of a full workspace resolution.
277+
///
278+
/// This contains the resolved dependency graph for the entire workspace
279+
/// as well as the resolved features for each package.
239280
pub struct WorkspaceResolve<'gctx> {
240281
/// The full package set that was resolved.
241282
pub pkg_set: PackageSet<'gctx>,

0 commit comments

Comments
 (0)
